import ROOMS from "@space-game/shared/resolvers/rooms";

export default function Home() {
  return (
    <div>
      Imported modules from another workspace:

        <div>a {ROOMS}</div>
    </div>
  )
}
