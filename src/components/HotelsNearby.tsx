import * as React from 'react';
import {
    Carousel,
    CarouselCaption,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    Col,
    Jumbotron,
    Row
} from 'reactstrap';

interface Props {
}

interface State {
    readonly activeIndex: number;
}

const photo1 = require('../img/hostel1-big.jpg');
const photo2 = require('../img/hostel2-big.jpg');
const photo3 = require('../img/hostel3-big.jpg');
const items = [
    {
        src: photo1,
        captionText: '53800 St Saturnin du Limet',
        captionHeader: 'Appartements Le Hardas',
        href: 'https://www.gites.fr/gites_le-hardas-mercure_saint-saturnin-du-limet_h668613.htm'
    },
    {
        src: photo2,
        captionText: '53800 Renazé',
        captionHeader: 'Maison de vacances La Petite Coquais',
        href: 'https://www.gites.fr/gites_holiday-home-la-petite-coquais-05_renaze_h821078.htm'
    },
    {
        src: photo3,
        captionText: '53390 La Rouaudière',
        captionHeader: 'Maison de vacances La Rouaudiere',
        href: 'https://www.gites.fr/gites_holiday-home-la-rouaudiere-with-fireplace-i_la-rouaudiere_h1093959.htm'
    }
];

export default class HotelsNearby extends React.Component<Props, State> {

    animating: boolean;

    constructor(props: Props) {
        super(props);

        this.state = {
            activeIndex: 0
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) {
            return;
        }
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) {
            return;
        }
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex: number) {
        if (this.animating) {
            return;
        }
        this.setState({activeIndex: newIndex});
    }

    render() {
        const {activeIndex} = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} className="img-fluid img-500" alt={item.captionHeader}/>
                    <CarouselCaption captionText={item.captionText} captionHeader={item.captionHeader}/>
                </CarouselItem>
            );
        });

        return (
            <div>
                <Row>
                    <Col sm="12">
                        <Jumbotron>
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                            >
                                <CarouselIndicators
                                    items={items}
                                    activeIndex={activeIndex}
                                    onClickHandler={this.goToIndex}
                                />
                                {slides}
                                <CarouselControl
                                    direction="prev"
                                    directionText="Previous"
                                    onClickHandler={this.previous}
                                />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
                            </Carousel>
                        </Jumbotron>
                    </Col>
                </Row>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>
    //             <Row>
    //                 <Col sm="12">
    //                     <Card body={true}>
    //                         <CardTitle>Gîtes</CardTitle>
    //                         <CardText>Les gîtes à proximité du lieu.</CardText>
    //                         <img src={photo}/>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //         </div>
    //     );
    // }
}