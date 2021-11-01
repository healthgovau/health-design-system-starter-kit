import React, {Component} from 'react';

class Face extends Component {


    constructor(props) {
        super(props);

        this.state = {
            face: this.props.face,
            checked: this.props.checked,
        }

    }


    flip = () => {
        if (this.props.face.checked) {
            this.props.flip(this.props.id, false);
        } else {
            this.props.flip(this.props.id, true);
        }
    }


    render() {

        console.log(this.props.face);


        let classes = this.props.face.checked ? "flipped" : "noflip";

        return (
            <div className={'col-sm-4 standard-gap'} onClick={this.flip}>
                <div className={"flip-card " + classes}>
                    <div className="flip-card-inner">
                        {this.props.face.checked ? (
                            <div className="flip-card-back polaroid">
                                <img src={this.props.face.img} alt="Avatar"/>
                                <span>{this.props.id}</span>
                            </div>
                        ) : (
                            <div className="flip-card-front polaroid">
                                <img src={this.props.face.img} alt="Avatar"/>
                                <span>{this.props.id}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Face;