import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import { useState } from "react";
import Image from "next/image";

function SearchTeacher() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/search-teacher?query=${search}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src="/images/teacher.png"
          width={500}
          height={500}
          alt="search teacher"
        />
      </div>
      <div className={styles.form}>
        <div>
          <h2>Search Teacher</h2>
          <p>Find a teacher by name or their skills.</p>
        </div>
        <form onSubmit={handleSearch}>
          <div>
            <label htmlFor="search">Search Teacher</label>
            <input
              type="text"
              value={search}
              placeholder="Search by name or skills..."
              id="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.submit}>
            <button type="submit">Search Teacher</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchTeacher;
