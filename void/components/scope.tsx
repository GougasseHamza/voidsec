import { site } from "@/lib/site-data";

/**
 * Hero instrument graphic. Four contacts plotted on the scope, one per
 * practice area.
 *
 * Each contact sits at a real polar position (angle clockwise from twelve
 * o'clock, radius as a share of the scope) and blips as the sweep reaches it.
 * The blip delay is derived from the angle, so the timing stays correct if the
 * sweep period changes: delay = (angle / 360) * SWEEP.
 */
const SWEEP_SECONDS = 8;

const contacts = [
  { id: "01", angle: 38, radius: 30 },
  { id: "02", angle: 118, radius: 38 },
  { id: "03", angle: 205, radius: 23 },
  { id: "04", angle: 300, radius: 34 },
];

export function Scope() {
  return (
    <div className="signal-stage" aria-hidden="true">
      <div className="signal-meta signal-meta-top">
        <span>Practice areas</span>
        <span>04</span>
      </div>

      <div className="scope">
        <div className="scope-bezel" />
        <div className="scope-cardinals" />

        <div className="scope-ring" style={{ "--s": "34%" } as React.CSSProperties} />
        <div className="scope-ring" style={{ "--s": "67%" } as React.CSSProperties} />
        <div className="scope-ring scope-ring-edge" />

        <div className="scope-axis scope-axis-x" />
        <div className="scope-axis scope-axis-y" />

        <div className="scope-sweep" />

        {contacts.map((contact) => (
          <div
            className="scope-contact"
            key={contact.id}
            style={
              {
                "--a": `${contact.angle}deg`,
                "--r": `${contact.radius}%`,
                "--d": `${((contact.angle / 360) * SWEEP_SECONDS).toFixed(2)}s`,
              } as React.CSSProperties
            }
          >
            <i>
              <b />
              <span>{contact.id}</span>
            </i>
          </div>
        ))}

        <div className="scope-core">
          <span>VS</span>
        </div>
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
