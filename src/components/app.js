import React from 'react';
import FileInput from 'react-file-input';
import axios from 'axios';

export default class App extends React.Component {
   constructor(props){
      super(props);

      this.state = { results: null, error: null, url: null };
   }

   handleChange(e){
      // console.log(e.target.files[0]);
      if(e.target.files.length > 0){
         let data = new FormData();
         const image = e.target.files[0];
         const url = window.URL.createObjectURL(image);
         this.setState({results: null, error: null, url});

         const config = {
            headers: { 'content-type': 'multipart/form-data' }
         }

         data.append('image', image, image.name);
         axios.post('http://node.cambo.io:3000/upload', data, config)
         .then(response => {
            console.log('things went well!', response);
            this.setState({ results: response.data, error: null });
         })
         .catch(error => {
            console.log('oops!', error);
            this.setState({ error, results: null })
         })
      }
   }

   renderResults(){
      const results = this.state.results;
      if(results.FaceMatches.length > 0){
         let face = results.FaceMatches[0];
         return (
            <div className="result-success">
               i'm about {parseInt(face.Face.Confidence)}% sure that this is tom
            </div>
         )
      }else{
         return (
            <div className="result-failure">
               i don't think that this is tom
            </div>
         )
      }
   }

   renderErrors(){
      return <div className="result-error">there was a problem with this image. try again</div>;
   }

   render() {
      return (
         <div className="app-container">
            <h1>is this tom?</h1>
            <form>
               <FileInput
               name="image"
               accept=".png,.jpg"
               placeholder="click or drag-and-drop jpg or png to find out"
               className="file-input"
               onChange={this.handleChange.bind(this)}
               />
            </form>
            { this.state.url && <div className="image-upload"><img src={this.state.url} /></div>}
            { this.state.results && this.renderResults() }
            { this.state.error && this.renderErrors() }
            { (!this.state.results && !this.state.error && this.state.url) &&
            <div>loading...</div> }
         </div>
      );
   }
}
