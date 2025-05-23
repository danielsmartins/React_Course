import Entry from '/src/components/Entry'
import Header from '/src/components/Header'
import data from '/src/data'

export default function App() {
const entryElements = data.map((entry) => {
  return <Entry 
            key={entry.id}
            {...entry} // O mesmo de passar uma propriedade por vez.
           
            /* entry={entry} - passando o objeto inteiro
            
             img={{ src: entry.img.src, alt: entry.img.alt}}
            title={entry.title}
            country={entry.country}
            googleMapsLink={entry.googleMapsLink}
            dates={entry.dates}
            text={entry.text}  */
  />
})
  return (
    <>
      <Header />
      <main className='container'>
      {entryElements}
      </main>
    </>
  )
}