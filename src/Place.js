import React, {Component} from "react";

export default class Place extends Component{
    render(){
        var numberOfPhotos=this.props.placeData.photos.length;
        if (numberOfPhotos>6)
            numberOfPhotos=6;
        else
            numberOfPhotos=3;

        var htmlPhotos=[];
        this.props.placeData.photos.map((photo, index)=>{
            console.log(this.props.placeData.photos);
            htmlPhotos.push(
                <div key={index} className="col-4">
                    <img src={photo} alt={this.props.placeData.name} width="100%"></img>
                </div>);
                if (index === (numberOfPhotos-1)){
                    return;
                }
            return console.log(htmlPhotos);
        })

        return(
            <div className="m-2 mt-4 px-3 bg-secondary shadow rounded text-white">
                <div className="row py-4">
                    <div className="col-12 text-center">
                        {this.props.placeData.name}
                    </div>
                </div>

                <div className="row py-2">
                    {htmlPhotos.slice(0,3)}
                </div>

                <div className="row py-2">
                    {htmlPhotos.slice(3,6)}
                </div>

                <div className="row py-2">
                    <div className="col text-center">
                        {this.props.placeData.address}
                    </div>
                </div>

            </div>
        )
    }
}