import * as React from 'react';

interface Props {
    // match: { params: { email?: string } };
}

interface State {
    // readonly loading: boolean;
    // readonly notificationMessage: string;
    // readonly notificationColor: string;
}

export default class Unsubscribe extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        // this.state = {
        //     loading: true,
        //     notificationMessage: '',
        //     notificationColor: ''
        // };

        // this.startLoading = this.startLoading.bind(this);
        // this.stopLoading = this.stopLoading.bind(this);
    }

    // componentDidMount() {
    //     if (this.props.match.params.email) {
    //         fetch('/api/carSharingUnsubscribe/' + this.props.match.params.email)
    //             .then(result => result.json())
    //             .then((result) => {
    //                 this.setState({
    //                     loading: false,
    //                     notificationMessage: result.message,
    //                     notificationColor: result.saved ? 'success' : 'danger'
    //                 });
    //             })
    //             .catch(e => {
    //                 this.setState({
    //                     loading: false,
    //                     notificationMessage: 'La désinscription n\'a pas fonctionné, réessayez plus tard.',
    //                     notificationColor: 'danger'
    //                 });
    //                 console.warn(e);
    //             });
    //     }
    // }
    //
    // startLoading() {
    //     this.setState({loading: true});
    // }
    //
    // stopLoading() {
    //     this.setState({loading: false});
    // }

    render() {
        return (
            <div className="base-div-content">
                {/*<Row>*/}
                {/*<Col sm="12">*/}
                {/*<Card body={true} className="mt-3">*/}
                {/*<div className="title">S'abonner</div>*/}

                {/*<Alert color={this.state.notificationColor}>{this.state.notificationMessage}</Alert>*/}
                {/*</Card>*/}
                {/*</Col>*/}
                {/*</Row>*/}
            </div>
        );
    }
}