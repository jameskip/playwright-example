import { test, expect } from "@playwright/test";

test.use({
  baseURL: "https://petstore.swagger.io",
});

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const petId = getRandomNumber(1, 1000);

const expectedResponse = {
  category: { id: 0, name: "string" },
  id: petId,
  name: `doggie ${petId}`,
  photoUrls: ["string"],
  status: "available",
  tags: [{ id: 0, name: "string" }],
};

test.beforeAll(async ({ request }) => {
  await request.post(`/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    data: JSON.stringify(expectedResponse),
  });
});

// Delete pet after all tests are done
test.afterAll(async ({ request }) => {
  await request.delete(`/v2/pet/${petId}`, {
    headers: { api_key: "special-key" },
  });
});

test(`GET - doggie`, async ({ request }) => {
  const response = await request.get(`/v2/pet/${petId}`);

  expect(await response.json()).toEqual(
    expect.objectContaining(expectedResponse)
  );
});
