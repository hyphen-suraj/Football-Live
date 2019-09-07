let flag=0;

let sign=0;




// function for entering details of live matches in cards
const stats=(info,score)=>{
    console.log(info);
    

    
      const markup=`<div class="three-grid">
											<div class="three-grid-info" style="border-radius: 25px;margin-top: 20px;margin-left:10px;">

											<table class="score-board">
											    <tr>
											        
											        <td style="width: 30%;height: 85px"><img src=${score.awayTeam.logo} alt="logo"  style="width: 100%; height: 85px;margin-left: 5%;">
											       
											        </td>
											        
											        
											        
											        
											        
											         <td  style="width: 30%;height: auto;text-align: center; font-size: 15px;color: red;">
											             <b>V/S </b>
											         </td>
                                                    
                                                    
                                                    
                                                    
                                                     <td style="width: 30%;height: 85px;"><img src=${score.homeTeam.logo} alt="logo" style="width: 100%; height: 85px;margin-right: 5%;">
                                                    
                                                     </td>
	

   


</tr>
<br>
<tr style="margin-bottom: 10px;height: 20%;">
<td style="margin-left: 20%; height:50px;"><b>${score.awayTeam.team_name}</b></td>
<td style="height:50px;">&nbsp&nbsp&nbsp</td>
<td style="margin-right: 5%;height:50px;"> <b>${score.homeTeam.team_name}</b></td>
</tr>

<br>
<tr>
<td style="padding-left: 7%;color: #f56c42;"><b>${score.goalsAwayTeam}</b></td>
<td style="padding-left: 5%;color: #f56c42;"><b>GOALS</b></td>
<td style="padding-left: 7%;color: #f56c42;"><b>${score.goalsAwayTeam}</b></td>
</tr>
								
											</table>
												
                                            
												
												
												<table class="score-board" style="margin-top:5%;">
												    
												    <thead>
												        <th>
												        STATISTICS
												        
												        </th>
												        <th>AWAY</th>
												        <th>HOME</th>
												    </thead>
												    <tr>
												        <td>
												            Shots on Goal
												        </td>
												        <td>${info['Shots on Goal'].away} </td>




												        <td>${info["Shots on Goal"].home}</td>
												    </tr>
												    
												    
												     <tr>
												        <td>
												            Total Shots
												        </td>
												        <td>${info["Total Shots"].away}</td>
												        <td>${info["Total Shots"].home}</td>
												    </tr>
												    
												    
												     <tr>
												        <td>
												            Fouls
												        </td>
												        <td>${info.Fouls.away}</td>
												        <td>${info.Fouls.home}</td>
												    </tr>
												    
												    
												    
												     <tr>
												        <td>
												           Corner Kicks
												        </td>
												        <td>${info["Corner Kicks"].away}</td>
												        <td>${info["Corner Kicks"].home}</td>
												    </tr>
												    
												    
												    
												     <tr>
												        <td>
												            Offsides
												        </td>
												        <td>${info.Offsides.away}</td>
												        <td>${info.Offsides.home}</td>
												    </tr>
												    
												    
												    
												     <tr>
												        <td>
												            Ball Possession
												        </td>
												        <td>${info["Ball Possession"].away}</td>
												        <td>${info["Ball Possession"].home}</td>
												    </tr>
												    
												    
												    
												     <tr>
												        <td>
												            Yellow Cards
												        </td>
												        <td>${info["Yellow Cards"].away}</td>
												        <td>${info["Yellow Cards"].home}</td>
												    </tr>
												    
												    
												    
												     <tr>
												        <td>
												           Red Cards
												        </td>
												        <td>${info["Red Cards"].away}</td>
												        <td>${info["Red Cards"].home}</td>
												    </tr>
												    
												    
												    
												    
												     <tr>
												        <td>
												            Goalkeeper Saves
												        </td>
												        <td>${info["Goalkeeper Saves"].away}</td>
												        <td>${info["Goalkeeper Saves"].home}</td>
												    </tr>
												    
												    
												    
												    
												</table>
																									</div>
											
										</div>`;
    
    let x=document.querySelector('#cards').insertAdjacentHTML('beforeend',markup);
    
   sign=1;
    
}

//FUNCTION ENDS HERE







// fuction calling ajax for the detais of each live match
const view=score=>{
    console.log(score);
    
    
   
  require(['axios'], function (axios,){
   
    let headers = {
     
         'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
	'x-rapidapi-key': 'd190e979aemshbdb05298197a572p1f38a0jsn8b32399a1d55'
    };
       
       
  let result= axios.get(`https://api-football-v1.p.rapidapi.com/statistics/fixture/${score.fixture_id}`, {headers})
 .then(ans=>{
     
     
  let teamscore=ans.data.api.statistics;
      console.log(teamscore);
      remove_loader();
        stats(teamscore,score);
     
     remove_message();
         
      
           
     
         
  })
    .catch(error=>{
     console.log(error);
        
         nomatch();
        if(sign==1)
         remove_message();   
       
  });
  
});
    

};
// DETAILED AJAX FUNCTION ENDS HERE






// function calling ajax for all the live matches
 function getresult(theme,func){

require(['axios'],  function (axios,) {
   
    let headers = {
     
         'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
	'x-rapidapi-key': 'd190e979aemshbdb05298197a572p1f38a0jsn8b32399a1d55'
    };
       
       loader();
  let result= axios.get(`https://api-football-v1.p.rapidapi.com${theme}`, {headers})
 .then(response=>{
      
  let liveScore=response.data.api.fixtures;
      console.log(liveScore);
     if(liveScore.length==0){
         
         nomatch();
        
     }
      
    
        liveScore.forEach(func);
    
  })
    .catch(error=>{
      
        
           console.log(error.message);
        
        if(error.message=="Network Error"){
            
           
            internet_err()
        }
  });

 
   

});
 };
// LIVE MATCHES INFO AJAX FUNCTION END HERE



getresult('/v2/fixtures/live',view);






// fuction for no live match message
function nomatch() {
    
     if(flag==0){
      remove_loader();   
    let  markup2=`<div id="no_match" style="width: 90%;height: 100px;color: #f56c42;margin-top: 5%;padding-top: 2%;padding-left: 40%;margin-left: 5%">
									<h3>NO LIVE MATCHES</h3>
</div>`;
      document.querySelector('#top_img').insertAdjacentHTML('beforeend',markup2);
         flag=1;
        
     }
}
// END






// fuction for showing no internet connection message
function internet_err(){
    
     if(flag==0){
          remove_loader();
    let  markup2=`<div id="no_match" style="width: 90%;height: 100px;color: #f56c42;margin-top: 5%;padding-top: 2%;padding-left: 40%;margin-left: 5%">
									<h3>NO INTERNET CONNECTION</h3>
</div>`;
      document.querySelector('#top_img').insertAdjacentHTML('beforeend',markup2);
         flag=1;
     }
} 
//END






// function for loader
function loader(){
   let markup3=`<div class="loader" style="margin-left:50%;margin-top:20px;"></div>`;
    document.querySelector('#top_img').insertAdjacentHTML('beforeend',markup3);
}
//END







//function to remove loader
function remove_loader(){
     
    
    if(document.querySelector('.loader')!=null)
    
    document.querySelector('.loader').parentNode.removeChild(document.querySelector('.loader'));

}
//END




function remove_message(){
     document.querySelector('#top_img').parentNode.removeChild(document.querySelector('#top_img'));
}