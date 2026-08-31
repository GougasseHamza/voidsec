import { site } from "@/lib/site-data";

/** The hero instrument graphic. Four nodes = the four practice areas. */
export function Scope() {
  return (
    <div className="signal-stage" aria-hidden="true">
      <div className="signal-meta signal-meta-top">
        <span>Practice areas</span>
        <span>04</span>
      </div>

      <div className="scope">
        <div className="scope-ring scope-ring-one" />
        <div className="scope-ring scope-ring-two" />
        <div className="scope-ring scope-ring-three" />
        <div className="scope-axis scope-axis-x" />
        <div className="scope-axis scope-axis-y" />
        <div className="scope-sweep" />
        <div className="scope-core">
          <span className="scope-slash">/</span>
          <span>VS</span>
        </div>
        <span className="scope-node node-one">01</span>
        <span className="scope-node node-two">02</span>
        <span className="scope-node node-three">03</span>
        <span className="scope-node node-four">04</span>
      </div>

      <div className="signal-meta signal-meta-bottom">
        <span>
          {site.city}, {site.country}
        </span>
        <span>{site.coords}</span>
      </div>
    </div>
  );
}
