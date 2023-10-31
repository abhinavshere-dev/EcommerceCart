import {
    fireEvent,
    render,
    screen
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import GenerateCoupan from "../GenerateCoupan";

describe("Generate Coupan Render", () => {
  test("route navigation using useNavigate", () => {
    render(
      <MemoryRouter>
        <GenerateCoupan />
      </MemoryRouter>
    );
    const homenavigate = screen.getByTestId("homenavigate");
    fireEvent.click(homenavigate);
  });
  test("input field render", () => {
    render(
      <MemoryRouter>
        <GenerateCoupan />
      </MemoryRouter>
    );
    const productid = screen.getByTestId("productid");
    fireEvent.change(productid, {
      target: {
        value: "test",
      },
    });
    const discount = screen.getByTestId("discount");
    fireEvent.change(discount, {
      target: {
        value: "test",
      },
    });
    const Expiredate = screen.getByTestId("Expiredate");
    fireEvent.change(Expiredate, {
      target: {
        value: "test",
      },
    });
  });
  test("generate the coupan", () => {
    render(
      <MemoryRouter>
        <GenerateCoupan />
      </MemoryRouter>
    );
    const generatecoupan = screen.getByTestId("generatecoupan");
    fireEvent.click(generatecoupan);
  });
});
