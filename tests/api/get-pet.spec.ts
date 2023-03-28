import { test, expect } from "@playwright/test";

test.use({
  baseURL: "https://petstore.swagger.io",
  extraHTTPHeaders: {
    Accept: "application/json",
  },
});

const expectedResponse = {
  category: { id: 121212, name: "string" },
  id: 121212,
  name: "doggie 121212",
  photoUrls: ["string"],
  status: "available",
  tags: [{ id: 121212, name: "string" }],
};

test.beforeAll(async ({ request }) => {
  await request.post(`/v2/pet`, {
    data: { expectedResponse },
  });
});

test("GET - doggie 3", async ({ request }) => {
  const response = await request.get("/v2/pet/121212");

  expect(await response.json()).toEqual(
    expect.objectContaining(expectedResponse)
  );
});
