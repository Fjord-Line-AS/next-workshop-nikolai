"use server";
import Home from "@/components/pages/Home";
import { createClient, type ClientConfig } from "@sanity/client";
import type { Campaigns } from "@/types/sanity";

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-05-23",
};

const sanityClient = createClient(config);

const sanityData: Campaigns[] = [];

sanityClient
  .fetch('*[_type == "campaign"]')
  .then((res) => sanityData.push(res));

const getAllowedDestinations = async () => {
  const query = JSON.stringify({
    query:
      "query GetPortLegsForProduct($productCode: String!) {\n   portLegs(productCode: $productCode) {\n    originPort {\n      portCode\n      portName\n    }\n    allowedDestinations {\n     portCode\n     portName\n    }\n  }\n}",
    variables: { productCode: "WFPAX" },
  });
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query,
  };
  const res = await fetch(process.env.GRAPH_QL_API || "", requestOptions);
  return res.json();
};

const getInitialDeparturesGraphQl = async (portFrom: any, portTo: any) => {
  const date = new Date().toISOString().substring(0, 10);
  const query = JSON.stringify({
    query:
      "query GetDepartures($requestParams: DepartureCalendarRequestInput!) {\n  routes(departureRequest: $requestParams) {\n    routes {\n      routeName\n      portFrom\n      portTo\n      departures {\n        departureDate\n        arrivalTime\n        journeyCode\n        departureTime\n        departureCode\n        departureStatus\n      }\n    }\n  }\n}",
    variables: {
      requestParams: {
        originPort: portFrom,
        fromDate: new Date("2023-05-23").toISOString().substring(0, 10),
        destinationPort: portTo,
        toDate: new Date("2023-05-30").toISOString().substring(0, 10),
      },
    },
  });
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query,
  };

  const res = await fetch(process.env.GRAPH_QL_API || "", requestOptions);
  return res.json();
};

const handlePromises = (promiseArray: any) => {
  let routeNames: any[] = [];
  // Dynamically check for available routenames
  for (const route of promiseArray) {
    route.value.data.routes.routes.map((r: any) => {
      routeNames.push(r.routeName);
    });
  }
  // Transform list of route names to use them as a promiseArray
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  [...routeNames] = promiseArray;
  const data: any[] = [];
  routeNames.map((i) => {
    data.push(...i.value.data.routes.routes);
  });
  return data;
};

export default async function HomePage() {
  const promiseArray: any[] = [];

  //Get allowedDestinations from GQL
  const allowedDestinationsResponse = await getAllowedDestinations();

  const allowedDestinations = allowedDestinationsResponse.data.portLegs;
  allowedDestinations.map((destination: any) => {
    destination.allowedDestinations.map((d: any) => {
      promiseArray.push(
        getInitialDeparturesGraphQl(destination.originPort.portCode, d.portCode)
      );
    });
  });

  const res = await Promise.allSettled(promiseArray);

  const allDepartures = res.filter(
    (res) => res.status === "fulfilled"
  ) as PromiseFulfilledResult<any>[];

  const data = handlePromises(allDepartures);
  const initialDepartures: any[] = [];

  if (initialDepartures.length < 1) {
    data.map((data: any) => {
      const departures = data.departures;
      departures.map((route: any) => {
        initialDepartures.push({
          ...route,
          portFrom: data.portFrom,
          portTo: data.portTo,
        });
      });
    });
  }
  return (
    <Home
      contextData={[
        {
          dataType: "departures",
          description: "Used to find departures for our customers",
          departures: initialDepartures,
        },
        {
          dataType: "ports",
          description: "Used to find allowed destinations",
          portLegs: allowedDestinationsResponse.data.portLegs,
        },
        {
          dataType: "campaigns/offer",
          description:
            "Used to find campaings and offers that fjordline is currently offering",
          campaigns: sanityData,
        },
      ]}
    />
  );
}
