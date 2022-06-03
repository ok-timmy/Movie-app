import Image from "next/image";
import styled from "styled-components";
import { removeFromWatchList } from "../src/favorites/faves";


const Card = styled.div`
margin: 0 auto;
width: 254px;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const CardImg = styled.div`
width: 250px;
height: 250px;
`;

const CardTitle = styled.p`
font-size: 1.1rem;
font-weight: 300;
padding: 0 5px;
`;

const CardIcons = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 5px 5px;
`

const Button = styled.button`
border: none;
outline: none;
border-radius: 5px;
cursor: pointer;
`

function WatchListCard({card, email}) {
    console.log(card);
  return (
    <Card className="rounded shadow">
    <CardImg>
      <Image src={card.image} alt="next" width={250} height={250} />
    </CardImg>
    <CardTitle>{card.title}</CardTitle>
    <CardIcons>
      <Button><i className="bi bi-box-arrow-up-right" style={{color:"blue"}}></i></Button>
      <Button onClick={()=> {removeFromWatchList(card, email )}}><i className="bi bi-trash" style={{color:"red"}}></i></Button>
    </CardIcons>
    </Card>
  )
}

export default WatchListCard