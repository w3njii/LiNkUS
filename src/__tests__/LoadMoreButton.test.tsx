import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoadMoreButton from "../components/events/LoadMoreButton";

describe("LoadMoreButton", () => {
  test("renders button when hasMore is true", () => {
    render(
      <LoadMoreButton onClick={() => {}} isLoading={false} hasMore={true} />
    );
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  test("does not render button when hasMore is false", () => {
    const { container } = render(
      <LoadMoreButton onClick={() => {}} isLoading={false} hasMore={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("shows 'Loading...' when isLoading is true", () => {
    render(
      <LoadMoreButton onClick={() => {}} isLoading={true} hasMore={true} />
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("calls function onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(
      <LoadMoreButton onClick={handleClick} isLoading={false} hasMore={true} />
    );
    fireEvent.click(screen.getByText("Load More"));
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test("disables button when isLoading is true", () => {
    render(
      <LoadMoreButton onClick={() => {}} isLoading={true} hasMore={true} />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});