import { test, expect } from "@playwright/test";
import { getRandomNumber } from "../../utils/helpers";

test.use({
  baseURL: "https://petstore.swagger.io",
});

const petId = getRandomNumber(1, 1000);

const expectedResponse = {
  category: { id: 0, name: "string" },
  id: petId,
  name: `doggie ${petId}`,
  photoUrls: ["string"],
  status: "available",
  tags: [{ id: 0, name: "string" }],
};

// CREATE pet before all tests are run
test.beforeAll(async ({ request }) => {
  await request.post(`/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    data: JSON.stringify(expectedResponse),
  });
});

// DELETE pet after all tests are done
test.afterAll(async ({ request }) => {
  await request.delete(`/v2/pet/${petId}`, {
    headers: { api_key: "special-key" },
  });
});

test(`CRUD - Pet`, ({ request }) => {
  // READ pet by id
  test.step(`GET - doggie`, async () => {
    const response = await request.get(`/v2/pet/${petId}`);

    expect(await response.json()).toEqual(
      expect.objectContaining(expectedResponse)
    );
  });

  // UPDATE pet status
  test.step(`PUT - doggie`, async () => {
    const updatedResponse = { ...expectedResponse, status: "sold" };

    const response = await request.put(`/v2/pet`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      data: JSON.stringify(updatedResponse),
    });

    expect(await response.json()).toEqual(
      expect.objectContaining(updatedResponse)
    );
  });
});
