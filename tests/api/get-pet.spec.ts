import { test, expect } from "@playwright/test";

test.use({
  baseURL: "https://petstore.swagger.io",
  extraHTTPHeaders: {
    Accept: "application/json",
  },
});

const petId = 121212;

const expectedResponse = {
  category: { id: petId, name: "string" },
  id: petId,
  name: `doggie ${petId}`,
  photoUrls: ["string"],
  status: "available",
  tags: [{ id: petId, name: "string" }],
};

test.beforeAll(async ({ request }) => {
  await request.post(`/v2/pet`, { data: { expectedResponse } });
});

test("GET - doggie 3", async ({ request }) => {
  const response = await request.get(`/v2/pet/${petId}`);

  expect(await response.json()).toEqual(
    expect.objectContaining(expectedResponse)
  );
});
