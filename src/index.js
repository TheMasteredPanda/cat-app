import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Image extends React.Component {

    render() {
        let imgSrc = this.props.fileLocation === null ? '#' : this.props.fileLocation;
        console.log(imgSrc);

        return (<div id="box">
        <h2>{this.props.fileName === null ? "No File Loaded." : this.props.fileName}</h2>
        <img src={imgSrc} />
        </div>);
    }
}

function Button(props) {
    return <button id={props.id} onClick={props.onClick}>{props.name}</button>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: null,
            fileLocation: null
        }
    }

    componentDidMount() {
        this.getImage(true);
    }

    getImage(next) {
        fetch(`http://127.0.0.1:3001/cat-images?currentImage=${this.state.fileLocation}&action=${next ? 'next' : 'previous'}`).then(res => res.json()).then(json => {
            this.setState({fileName: json.name, fileLocation: json.location});
            console.log(json);
        });
    }

    render() {
        return (<div>
            <Image fileName={this.state.fileName} fileLocation={this.state.fileLocation}/>
            <Button id="previousButton" name="Previous Image." onClick={() => this.getImage(false)}/>
            <Button id="nextButton" name="Next Image." onClick={() => this.getImage(true)}/>
            </div>);
    }
}


ReactDOM.render(<App />, document.getElementById('root'));