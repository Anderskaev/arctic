import { useParams } from 'react-router'

export default function Card() {
    const { id } = useParams()   
    return <h1>Город { id }</h1>;
}