import Link from "next/link";

import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="page-head shell notfound">
      <span className="section-kicker">Error 404</span>
      <h1>
        Nothing at
        <br />
        this path<span>.</span>
      </h1>
      <p className="page-lede">
        The page you asked for does not exist. It may have moved, or never have
        been here in the first place.
      </p>
      <Link className="text-link" href="/">
        Back to the homepage
        <ArrowUpRight />
      </Link>
    </section>
  );
}
