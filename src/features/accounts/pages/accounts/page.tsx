"use client";

import { AddNew } from "../../components";
import { Transfer } from "../../components";
import { Detail } from "../../components";
import { List } from "../../components";
import { HeaderAside } from "../../components";

export default function AccountsContent() {
  return (
    <>
      <HeaderAside />
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="container-edge container sticky top-16 z-20 -my-4 grid grid-cols-2 gap-4 bg-white py-4 dark:bg-dark">
          <AddNew />
          <Transfer />
        </div>
        <List />
        <Detail />
      </div>
    </>
  );
}
