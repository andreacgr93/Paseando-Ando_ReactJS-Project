import React, {Component} from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import '../node_modules/font-awesome/css/font-awesome.css';
import Place from "./Place";
import Schedule from "./Schedule";

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      photo:"",
      places: "",
      schedule: "",
      rating: ""
    }
  }
  
  map="";

  componentDidMount(){
    const googlePlaceAPI = setInterval(() => {
      if (window.google){
       this.google=window.google;
       clearInterval(googlePlaceAPI);
       console.log("Load Place API");
       const mapCenter = new this.google.maps.LatLng( 4.624335,-74.064644);
       this.map = new this.google.maps.Map(
        document.getElementById("googleMapContainer"), {
         center: mapCenter,
         zoom: 15 });
        };
      }, 100);
  }

  handlingOnClick = () =>{
    const request = {
      query: document.getElementById("origen").value,
      fields: ["photos", "formatted_address", "name","place_id"]
    };
    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.findPlaceFromQuery(request, this.findPlaceResult);
    console.log(this.service);
  }

  findPlaceResult = (results, status) => {
    var placesTemp=[];
    var placeId="";
    console.log("Place Service Status: "+status);
    if (status === "OK") {
      results.map((place) => {
        console.log("Place name: "+place.name+ " Place id: "+place.place_id +" Place address: "+place.formatted_address);

        var placePhotos=[];
        const placeTemporary={
          id:place.place_id, 
          name:place.name, 
          address:place.formatted_address, 
          photos:placePhotos
        }
        placeId=place.place_id;
        placesTemp.push(<Place placeData={placeTemporary}/>)        
      });
    }
    if (placesTemp.length>0){
      this.findPlaceDetail(placeId);
    }
    else{
      const placeTemporary={
        id:"N/A", 
        name:<div className="mt-5"><strong className="">No hay resultados</strong></div>, 
        address:"", 
        photos:[]
      }
      placesTemp.push(<Place placeData={placeTemporary}/>)
      this.setState({places:placesTemp})
    }
  };

  findPlaceDetail=(placeIdFound)=>{
    var request={
      placeId: placeIdFound,
      fields: ["address_component", "adr_address", "alt_id", "formatted_address", "opening_hours", "icon", "id", "name", "business_status", "photo", "place_id", "plus_code", "scope", "type", "url", "utc_offset_minutes", "vicinity", "geometry", "rating", "reviews"]
    }
    this.service.getDetails(request, this.foundPlaceDetail);
  }

  showMap(mapCenter) {
    var map = new window.google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: mapCenter});
    var marker = new window.google.maps.Marker({position: mapCenter, map: map});
  }

  foundPlaceDetail=(place, status)=>{
    if (status==="OK"){
      var placePhotos=[];
      if (place.photos){
        place.photos.map((placePhoto, index)=>{
          placePhotos[index]=placePhoto.getUrl({"maxWidth": 200, "maxHeight": 100});
          if (index===2) return;
        })
      }
      const placeTemporary={
        id:place.place_id, 
        name:place.name, 
        address:place.formatted_address, 
        photos:placePhotos
      }
      const placesTemp=<Place placeData={placeTemporary}/>;

      const placeSchedule=<Schedule placeSchedule={place.opening_hours}/>

      /*var placeRating="";
      if (place.rating){
        placeRating = <Rating placeRating={place.rating} placeReviews={place.reviews}/>
      }*/

      console.log(
        "address_component: "+place.address_component, 
        ", adr_address: "+place.adr_address, 
        ", alt_id: "+place.alt_id, 
        ",formatted_address: "+place.formatted_address, 
        ", opening_hours: "+place.opening_hours,
        ", icon: "+place.icon, 
        " id: "+place.id, 
        ", name: "+place.name, 
        ", business_status: "+place.business_status, 
        ", photo: "+place.photo, 
        ", place_id: "+place.place_id, 
        ", plus_code: "+place.plus_code, 
        ", scope: "+place.scope, 
        ", type: "+place.type, 
        ", url: "+place.url, 
        ", utc_offset_minutes: "+place.utc_offset_minutes, 
        ", vicinity: "+place.vicinity, 
        ", geometry: "+place.geometry,
        ", rating: "+place.rating,
        ", reviews: "+place.reviews
      );
      this.setState({places:placesTemp,
                    schedule: placeSchedule,
                    /*rating: placeRating}*/);
      this.showMap(place.geometry.location)
    }
  }


  render() {
    return (
      <div className="App mt-3">

        <div id="googleMapContainer"></div>

        <div className="container border rounded p-3 mt-4]" style={{width:"60%"}}>
          <div>
            <div className="col text-center">
              <label><strong className="text-white" style={{textShadow: "1px 1px 1px grey"}}>Indica un destino:</strong></label>
            </div>
            <div className="col pb-3"><input id="origen" type="text"/></div>
            <div className="col text-center">
              <div className="btn btn-secondary text-center" onClick={this.handlingOnClick}>Buscar Lugar</div>
            </div>
          </div>
          {this.state.places}
          {this.state.schedule}
        </div>
      </div>
    );
  }
}

export default App;
