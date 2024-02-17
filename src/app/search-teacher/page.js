import SearchTeacherPage from "@/components/search-teacher";

function page({ searchParams }) {
  return <SearchTeacherPage query={searchParams.query} />;
}

export default page;
