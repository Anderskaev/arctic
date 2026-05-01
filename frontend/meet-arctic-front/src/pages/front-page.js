
import Hero from "../components/hero";
import Stats from "../components/stats";
import ArcticMap from "../components/arcticmap"

export default function Home({ cities, countries }) {

  return (
    <>
      <div className="screen">
        <Hero />
        <Stats cities={cities} />

        <div className="section">
          <div className="section-eyebrow">About the project</div>
          <h2>The Arctic is not empty. It never was.</h2>
          <p>When most people picture the Arctic, they see ice. Polar bears. Endless tundra. But the Arctic is home to around four million people — fishermen and scientists, miners and reindeer herders, families whose towns have stood for centuries.</p>
          <p>Meet the Arctic is a postcard project built around these places. Each card features a different settlement: its name, its coordinates, its story. Download and print them, send one to a friend, or collect them as a small atlas of the far north.</p>
        </div>

        <div className="section">
          <div className="section-eyebrow">How it works</div>
          <h2>A postcard for every place</h2>
          <div className="city-grid">
            <div className="how-card city-thumb">
              <div className="how-num">01</div>
              <h3>Browse settlements</h3>
              <p>344 Arctic locations across 8 countries, from Murmansk to remote Inuit villages in Canada.</p>
            </div>
            <div className="how-card city-thumb">
              <div className="how-num">02</div>
              <h3>Generate a postcard</h3>
              <p>Each settlement gets its own card.</p>
            </div>
            <div className="how-card city-thumb">
              <div className="how-num">03</div>
              <h3>Download or print</h3>
              <p>Save the card as a file, print it at home. Send it anywhere in the world.</p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-eyebrow">Preview</div>
          <h2>What a postcard looks like</h2>
          <p>Cards are still being designed — here's a glimpse of what's coming.</p>

        </div>

        <div className="quote-section">
          <blockquote>"The Arctic is not a place at the edge of the world. For those who live there, it is the centre of it."</blockquote>
          <ArcticMap settlements={ cities } count={10} />
        </div>

        <div className="section">
          <div className="section-eyebrow">Contacts</div>
          <h2>What a postcard looks like</h2>
          <p>Cards are still being designed — here's a glimpse of what's coming.</p>

        </div>       

        {/* <div className="text-block">
          <h1>Meet the Arctic: A Journey Through Postcards </h1>
          <p><b>Meet the Arctic</b> is an initiative dedicated to bridging the gap between the remote North and the rest of the world. While the Arctic is often seen as a vast, empty wilderness of ice, it is actually home to vibrant communities, resilient cultures, and unique urban landscapes.</p>
          <p>One of our project’s core missions is to introduce Arctic settlements to the wider public through the timeless medium of postcards.</p>
          <p>In an era of instant digital communication, we believe that a physical postcard carries a deeper story. Each card features a different northernmost settlement—from the industrial history of Murmansk to the scientific outposts of Svalbard. By highlighting these locations, we aim to:</p>
          <ul>
            <li>Humanize the High North: Showcasing the people, architecture, and daily lives of those living in the world's most extreme climates.</li>
            <li>Promote Cultural Literacy: Educating the public about the diversity of the Arctic beyond the usual stereotypes.</li>
            <li>Create Tangible Connections: Allowing people to "meet" a city through a curated image and a story delivered right to their mailbox.</li>
          </ul>
          <p>Whether it is a populous city like Saint Petersburg or a tiny, isolated outpost, every settlement has a voice. Through "Meet the Arctic," we are putting these remarkable places on the map—one postcard at a time.</p>
        </div> */}
      </div> {/*screen active*/}
    </>
  );
}