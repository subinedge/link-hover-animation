// get the links
const links = document.getElementsByTagName('a');
// console.log(links);
// as it is a HTML Collection, it can't be looped through, so changing it to array
// spread operator
[...links].forEach(link => {
  // add event listener to links...
  link.addEventListener('mouseover', handleMouseOver);
  link.addEventListener('mouseleave', handleMouseLeave);
  link.addEventListener('mousemove', handleMouseMove);
});

function handlePosition(e) {
  const ID = e.target.getAttribute('data-hover-id');
  // console.log(ID);
  const wrapper = document.getElementById(ID);
  let top = "";

  // decide the position of hoverContent from top
  if(!(e.target.getBoundingClientRect().top + wrapper.offsetHeight > innerHeight)) {
    // getBounding client Rect.top measures the distance from top to link
    // wrapper.offsetheight measures the height of hover content
    // if above both added is > than innerHeight, then the hoverContent should show above the link

    // i will reduce the innerHeight - showing above
    // innerHeight is greater than both combined then show below

// now lets write top position calculation
top = `${e.clientY + e.target.offsetHeight}px`;
  }else {
    top = `${e.clientY - (wrapper.offsetHeight + e.target.offsetHeight)}px`;
  }

  return `position: fixed; left: ${e.clientX -
    wrapper.offsetWidth / 2}px; top:${top}`;

  // positioning is not correct
}

function handleMouseOver(e) {
  // get the content
  const hoverContent = e.target.getAttribute("data-hover-content");
  // console.log(hoverContent);
  // the other link div is not coming because of the mouseleave, mousemove function not defined.
  // now hover
  // generate random ID for every link we visit/hover
  const ID = Math.random().toString(36).substr(2, 9);
  // console.log(ID);
  const wrapper = document.createElement('div');
  e.target.setAttribute('data-hover-id', ID);
  wrapper.setAttribute('data-hover-wrapper', '');
  wrapper.setAttribute("id", ID);
  // assigned ID to wrapper div and empty attribute.
  // console.log(wrapper);
  wrapper.setAttribute('style', 'opacity:1; transform:scale(0.8)');
  // initial hide
  // append the div to body
  wrapper.innerHTML = hoverContent;
  document.body.append(wrapper);
  // innerHTML assign the content
  wrapper.setAttribute('style', handlePosition(e));
  
}


function handleMouseLeave(e) {
  const ID = e.target.getAttribute('data-hover-id');
  // while leaving get the target ID and change opacity to 0 by reduce the scale value to 0.8

  document.getElementById(ID).style.opacity=0;
  document.getElementById(ID).style.transform="scale(0.8)";

  // also it should not stay after changing the opacity, so remove the ID

  setTimeout(()=> {
    document.getElementById(ID).remove();
  }, 150)
}

// content is not moving on mousemove,

function handleMouseMove(e) {
  // get the ID
  const ID = e.target.getAttribute('data-hover-id');
  const wrapper = document.getElementById(ID);
  wrapper.setAttribute("style", handlePosition(e));
}
