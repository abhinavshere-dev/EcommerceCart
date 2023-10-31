import {
    fireEvent,
    render,
    screen
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Shopper } from "../shopper";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios");

describe("shopeer Render", () => {
  test("route navigation using useNavigate", () => {
    render(
      <MemoryRouter>
        <Shopper />
      </MemoryRouter>
    );
    const shopperElement = screen.getByTestId("shopper");
    fireEvent.click(shopperElement);
    const generateCoupan = screen.getByTestId("generate-coupan");
    fireEvent.click(generateCoupan);
  });
});
