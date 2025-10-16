import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  Banner,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  CalloutCard,
  Card,
  Grid,
  Icon,
  InlineGrid,
  InlineStack,
  LegacyCard,
  Link,
  MediaCard,
  Page,
  RadioButton,
  Text,
  VideoThumbnail,
} from "@shopify/polaris";
import {
  AlertTriangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  ExportIcon,
  ExternalIcon,
  PlusIcon,
  XIcon,
} from "@shopify/polaris-icons";
import { Group } from "@shopify/polaris/build/ts/src/components/FormLayout/components";
import { useState } from "react";

/**
 * Base route: app.cloneui.tsx
 * - loader: trả về dữ liệu ban đầu cho UI
 * - action: xử lý POST từ client (trả về JSON)
 * - component: minimal UI dùng fetcher.Form để submit mà không redirect
 */

export const loader = async () => {
  return json({
    title: "Clone UI - base",
    createdAt: new Date().toISOString(),
  });
};

export const action = async () => {
  // TODO: xử lý server-side (lưu DB, gọi API, ...)
  return json({ success: true, name });
};

export default function CloneUI() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <Page
      title="Hi, Hoàng Vũ"
      subtitle="Welcom to Avis Subscription Apps"
      secondaryActions={
        <div
          style={{
            width: "119px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E3E3E3",
            borderRadius: "8px",
            gap: 8,
          }}
        >
          <Text as="p" variant="bodySm" fontWeight="medium">
            What new?
          </Text>
          <span
            style={{
              width: 24,
              height: 20,
              background: "#E0F0FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text as="p" variant="bodySm" fontWeight="medium">
              3
            </Text>
          </span>
        </div>
      }
      primaryAction={
        <div
          style={{
            width: "144px",
            height: "32px",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          <Button
            icon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                  paddingLeft: 5,
                }}
              >
                <img
                  src="/icons/flag.jpg"
                  alt="English"
                  style={{
                    width: 20,
                    height: 15,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <Text as={"p"} variant="bodySm" fontWeight="medium">
                  English
                </Text>
              </div>
            }
            fullWidth
            textAlign="left"
            disclosure="down"
            onClick={() => {}}
          >
            {" "}
          </Button>
        </div>
      }
    >
      <BlockStack gap="500">
        <Banner title="Avis Subscription App is not activated" tone="warning">
          <Box padding="0">
            <BlockStack gap="200">
              <Text as="p" variant="bodyMd">
                Please enable the app by clicking the button below and then
                ‘Save’ on your theme
              </Text>

              <InlineStack align="start" gap="200">
                <ButtonGroup>
                  <Button variant="primary" onClick={() => {}}>
                    Active App
                  </Button>
                  <Button variant="plain" onClick={() => {}}>
                    Refresh status
                  </Button>
                </ButtonGroup>
              </InlineStack>
            </BlockStack>
          </Box>
        </Banner>
        <BlockStack gap="400">
          <Card padding="0">
            <BlockStack gap="0">
              <Box borderColor="border" borderBlockEndWidth="025" padding="400">
                <InlineStack align="space-between" blockAlign="center">
                  <BlockStack gap="100">
                    <Text variant="headingMd" as="h6" fontWeight="semibold">
                      Side guide
                    </Text>
                    <Text variant="bodyMd" as="h6" fontWeight="regular">
                      Use this personalized guide to get Avis app up and
                      running.
                    </Text>
                  </BlockStack>
                  <BlockStack align="end">
                    <ButtonGroup>
                      <Button icon={ChevronDownIcon} variant="tertiary" />
                      <Button
                        icon={
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transform: "scale(0.75)",
                            }}
                          >
                            <Icon source={XIcon} />
                          </span>
                        }
                        tone="critical"
                        variant="tertiary"
                      />
                    </ButtonGroup>
                  </BlockStack>
                </InlineStack>
              </Box>
              <Box padding="400">
                <BlockStack gap="200">
                  <Box padding="200">
                    <InlineStack>
                      <RadioButton
                        label="Create a subscription plan"
                        id="optional1"
                        name="accounts1"
                      />
                    </InlineStack>
                  </Box>
                  <Box padding="200">
                    <InlineStack>
                      <RadioButton
                        label="Choose your widget style to catching customer attention"
                        id="optional2"
                        name="accounts2"
                      />
                    </InlineStack>
                  </Box>
                  <Box padding="200">
                    <InlineStack>
                      <RadioButton
                        label="See how it looks on your store"
                        id="optional3"
                        name="accounts3"
                      />
                    </InlineStack>
                  </Box>
                </BlockStack>
              </Box>
              <Box
                padding="400"
                borderColor="border"
                borderBlockStartWidth="025"
              >
                <InlineStack align="end">
                  <Button>Dismiss Guide</Button>
                </InlineStack>
              </Box>
            </BlockStack>
          </Card>
          <Card padding="0">
            <Box paddingInline="400" paddingBlock="600">
              <BlockStack gap="400">
                <InlineStack align="start">
                  <Text variant="headingMd" as="h3" fontWeight="semibold">
                    Video Tutorial
                  </Text>
                </InlineStack>
                <InlineStack gap="400" align="center">
                  <Box width="450px">
                    <div style={{ display: "flex", height: "100%" }}>
                      <BlockStack gap="400" align="center">
                        <BlockStack gap="200">
                          <Link
                            monochrome
                            url="https://help.shopify.com/manual"
                          >
                            <Text as="p" variant="bodyMd" fontWeight="medium">
                              Create a subscription plan
                            </Text>
                          </Link>
                          <Text as="p" variant="bodyMd" tone="subdued">
                            Start by selecting the proucts you want to offer on
                            subscription and add a plan that suits your
                            custimers' needs.
                          </Text>
                        </BlockStack>
                        <InlineStack align="start" gap="200">
                          <ButtonGroup>
                            <Button variant="primary" onClick={() => {}}>
                              Watch Video
                            </Button>
                            <Button variant="plain" onClick={() => {}}>
                              Read instruction
                            </Button>
                          </ButtonGroup>
                        </InlineStack>
                      </BlockStack>
                    </div>
                  </Box>
                  <Box width="450px">
                    <VideoThumbnail
                      videoLength={80}
                      thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                      onClick={() => console.log("clicked")}
                    />
                  </Box>
                </InlineStack>
              </BlockStack>
            </Box>
          </Card>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card padding="0">
                <Box paddingBlock="200" paddingInline="400">
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h6" fontWeight="semibold">
                      Total orders
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card padding="0">
                <Box paddingBlock="200" paddingInline="400">
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h6" fontWeight="semibold">
                      Lifetime subscription revenue
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      0₫
                    </Text>
                  </BlockStack>
                </Box>
              </Card>
            </Grid.Cell>
          </Grid>
          <Card>
            <BlockStack gap="600">
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="headingMd" as="h6" fontWeight="semibold">
                  Synthesize data
                </Text>
                <ButtonGroup>
                  <div style={{ width: "200px" }}>
                    <Button
                      icon={
                        // CalendarIcon
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 2,
                            paddingLeft: 5,
                          }}
                        >
                          <Icon source={CalendarIcon} />
                          <Text as={"p"} variant="bodySm" fontWeight="medium">
                            Last 30 days
                          </Text>
                        </div>
                      }
                      fullWidth
                      textAlign="left"
                      disclosure="select"
                    >
                      {" "}
                    </Button>
                  </div>
                  <Button variant="primary">View All</Button>
                </ButtonGroup>
              </InlineStack>
              <InlineGrid gap="600" columns={3}>
                <Box
                  borderColor="border"
                  borderBlockEndWidth="025"
                  paddingBlock="100"
                  paddingInline="200"
                >
                  <BlockStack gap="200">
                    <Text
                      variant="headingSm"
                      as="h6"
                      fontWeight="semibold"
                      tone="subdued"
                    >
                      Subscription revenue
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
                <Box
                  borderColor="border"
                  borderBlockEndWidth="025"
                  paddingBlock="100"
                  paddingInline="200"
                >
                  <BlockStack gap="200">
                    <Text
                      variant="headingSm"
                      as="h6"
                      fontWeight="semibold"
                      tone="subdued"
                    >
                      First time order revenue
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
                <Box
                  borderColor="border"
                  borderBlockEndWidth="025"
                  paddingBlock="100"
                  paddingInline="200"
                >
                  <BlockStack gap="200">
                    <Text
                      variant="headingSm"
                      as="h6"
                      fontWeight="semibold"
                      tone="subdued"
                    >
                      Recurring order revenue
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
              </InlineGrid>
              <InlineGrid gap="600" columns={3}>
                <Box
                  borderColor="border"
                  borderBlockEndWidth="025"
                  paddingBlock="100"
                  paddingInline="200"
                >
                  <BlockStack gap="200">
                    <Text
                      variant="headingSm"
                      as="h6"
                      fontWeight="semibold"
                      tone="subdued"
                    >
                      Subscription growth
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
                <Box
                  borderColor="border"
                  borderBlockEndWidth="025"
                  paddingBlock="100"
                  paddingInline="200"
                >
                  <BlockStack gap="200">
                    <Text
                      variant="headingSm"
                      as="h6"
                      fontWeight="semibold"
                      tone="subdued"
                    >
                      New subscriptions
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
                <Box
                  borderColor="border"
                  borderBlockEndWidth="025"
                  paddingBlock="100"
                  paddingInline="200"
                >
                  <BlockStack gap="200">
                    <Text
                      variant="headingSm"
                      as="h6"
                      fontWeight="semibold"
                      tone="subdued"
                    >
                      Cancelled subscriptions
                    </Text>
                    <Text variant="headingLg" as="h6" fontWeight="semibold">
                      20
                    </Text>
                  </BlockStack>
                </Box>
              </InlineGrid>
            </BlockStack>
          </Card>
          <CalloutCard
            title="Need some help to move faster?"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{ content: "Chat with us" }}
            secondaryAction={{
              content: "Read guide",
              onAction: () => {
                /* handle read guide */
              },
              variant: "plain",
            }}
            onDismiss={() => {}}
          >
            <p>
              Our support team is avaliable 24/7 via in-app live chat to assist
              you, ensuring help is always available when you need it
            </p>
          </CalloutCard>
          <Box padding="400"></Box>
        </BlockStack>
      </BlockStack>
    </Page>
  );
}
