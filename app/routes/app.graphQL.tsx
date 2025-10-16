// app/routes/_index.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import shopify from "../shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin } = await shopify.authenticate.admin(request);

  const query = `#graphql
    query {
      shop {
        id
        name
        email
        contactEmail
        myshopifyDomain
        primaryDomain {
          url
          host
        }
        currencyCode
        plan {
          displayName
          partnerDevelopment
        }
        createdAt
        updatedAt
        description
        timezoneAbbreviation
        timezoneOffset
        ianaTimezone
        customerAccounts
        billingAddress {
          address1
          city
          country
          zip
        }
       
      }
    }
  `;

  const response = await admin.graphql(query);
  const data = await response.json();

  console.log("Shop info:", data);

  return json({ shop: data.data.shop });
}

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 20 }}>
      <h1>Shop Information</h1>
      <p>
        <strong>ID:</strong> {shop.id}
      </p>
      <p>
        <strong>Name:</strong> {shop.name}
      </p>
      <p>
        <strong>Email:</strong> {shop.email}
      </p>
      <p>
        <strong>Contact Email:</strong> {shop.contactEmail}
      </p>
      <p>
        <strong>Domain:</strong> {shop.primaryDomain.url}
      </p>
      <p>
        <strong>Currency:</strong> {shop.currencyCode}
      </p>
      <p>
        <strong>Plan:</strong> {shop.plan.displayName}
      </p>
      <p>
        <strong>Created At:</strong> {shop.createdAt}
      </p>
      <p>
        <strong>Timezone:</strong> {shop.ianaTimezone}
      </p>
      <p>
        <strong>Customer Accounts:</strong> {shop.customerAccounts}
      </p>
    </div>
  );
}
