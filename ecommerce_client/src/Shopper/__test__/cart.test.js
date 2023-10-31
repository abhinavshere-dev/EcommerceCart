import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Cart } from "../cart";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("axios");

describe("Cart Render", () => {
  test("route navigation using useNavigate", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const shopperElement = screen.getByTestId("shopper");
    fireEvent.click(shopperElement);
    const generateCoupan = screen.getByTestId("generate-coupan");
    fireEvent.click(generateCoupan);
  });

  test("fetchCart is called on component mount", async () => {
    // Mock Axios response data
    const mockData = {
      data: [
        {
          id: 1,
          price: 109.95,
          quantity: 1,
          discount: "10.99",
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          category: "men's clothing",
          coupanId: 1,
        },
      ],
      total: "154.95",
      coupan: [
        {
          id: 1,
          productId: 1,
          date: "2023-11-01",
          coupan: "QTHZYELI",
          discount: 10,
        },
      ],
    };
    axios.get.mockResolvedValue({ data: mockData });
    let component;

    await act(async () => {
      component = render(
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/api/fetchCartDetails");
    });

    mockData.data.forEach((product, index) => {
      const decrementButton = screen.getAllByTestId("decrement")[index];
      const incrementButton = screen.getAllByTestId("increment")[index];
      fireEvent.click(decrementButton);
      fireEvent.click(incrementButton);
    });
  });
  test("Coupan apply", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const selectcoupan = screen.getByTestId("selectcoupan")
    fireEvent.change(selectcoupan, { target: { value: 1 } });
    const applyCoupan = screen.getByTestId("applyCoupan");
    fireEvent.click(applyCoupan);
    const selectcoupans = screen.getByTestId("selectcoupan")
    fireEvent.change(selectcoupans, { target: { value: "" } });
  });
});
