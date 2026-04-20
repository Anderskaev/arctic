
import Hero from "../components/hero";
import Stats from "../components/stats";




export default function Home({ cities, countries }) {



  return (
    <>
      <div className="screen">
        <Hero />
        <Stats cities={cities} />

        <div className="text-block">
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
        </div>
      </div> {/*screen active*/}
    </>
  );
}