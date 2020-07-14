import React, { useLayoutEffect, useRef } from 'react';
import '../App.css';
import eagles from './animated-eagle-image-0036.gif'
function Animation() {

  const aliceSprite = useRef(null);
  const foreground = useRef(null);
  const background = useRef(null);
  const eagle = useRef(null)

  useLayoutEffect(() => {
    // Alice
      var spriteFrames = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-100%)' }   
      ];

      var alice = aliceSprite.current.animate(
        spriteFrames, {
          easing: 'steps(7, end)',
          direction: "reverse",
          duration: 1000,
          playbackRate: 1,
          iterations: Infinity
        });

      setInterval( function() {
        if (alice.playbackRate > .4) {
          alice.playbackRate -= .1;
          adjustSceneryPlayback();
        } 
      }, 8000);

    // Scenery
      var sceneryFrames =   [
        { transform: 'translate(100%)' },
        { transform: 'translate(-100%)' }   
      ];
      
      var sceneryTimingBackground = {
        duration: 36000,
        iterations: Infinity
      };
      
      var sceneryTimingForeground = {
        duration: 12000,
        
        iterations: Infinity
      };
      
//
      var eagleframes =   [
        { transform: 'translateX(0%)' },
        { transform: 'translateX(350%)' }   
      ];
      
      var eagletiming = {
        duration: 30000,
        iterations: Infinity,
        easing: 'ease-in-out',
      };
      var foregroundMovement = foreground.current.animate(sceneryFrames, sceneryTimingForeground);
      var backgroundMovement = background.current.animate(sceneryFrames, sceneryTimingBackground);
      eagle.current.animate(eagleframes, eagletiming);

      var sceneries = [foregroundMovement, backgroundMovement];

      var adjustSceneryPlayback = function() {
        if (alice.playbackRate < .8) {
          sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2 * -1;
          });
        } else if (alice.playbackRate > 1.2) {
          sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2;
          });
        } else {
          sceneries.forEach(function(anim) {
            anim.playbackRate = 0;    
          });
        }   
      }
      adjustSceneryPlayback();

      const goFaster = () => {
        alice.playbackRate += 0.1;
        adjustSceneryPlayback();
      }
  
      setInterval(()=>{
        goFaster()
      },2000)
  })

  
  
  return (
    <div className="container">
      <div className="sky" >
      <div  ><img className="eagle" src={eagles} ref={eagle} alt="" /></div></div>
      <div className="earth">
        <div className="alice">
            <img className="alicesprite" ref={aliceSprite} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" alt=" " />
        </div>
      </div>
      
      <div className="scenery" id="foreground" ref={foreground}>
        <img id="treefore" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" alt=" "/>
      </div>

      <div className="scenery background1" ref={background}>
        <img className="pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" alt=" " />
        <img className="pawn2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" alt=" " />
        <img className="treeback" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" alt=" " />
      </div>
    </div>
  );
}

export default Animation;