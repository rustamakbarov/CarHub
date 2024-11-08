import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Main from "./_components/Main";
import { FilterOptions } from "./_types/types";

interface Params {
  searchParams: FilterOptions;
}

export default function Page({ searchParams }: Params) {
  const filter = Object.keys(searchParams).length > 0 ? searchParams : "all";

  return (
    <>
      <Header />
      <Main filter={filter} />
      <Footer />
    </>
  );
}
