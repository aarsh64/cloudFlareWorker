 const someHost = "https://static-links-page.signalnerve.workers.dev"
const url = "http://localhost:8787/links"
const hyperLinkContent = `\n<a href="https://cloudflare.com">Cloudflare</a>\n<a href="https://github.com">GitHub</a>\n<a href="https://google.com">Google</a>\n`
const content ='<a href="https://asampleurl.com">A sample URL</a><a href="https://anothersampleurl.com">Another sample URL</a><a href="https://afinalsampleurl.com">A final sample URL</a>'

addEventListener("fetch", event => {
      event.respondWith(handleRequest(event.request,event));
  })


//gatherResponse() function will fetch what type of content response is forwarding
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return await response.json()
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}


//Below is the LinkArray Object-Array.
let linkArray=[
  {
  name:"Facebook",
  url: "www.facebook.com"
},
 {
  name:"Google",
  url: "www.google.com"
}
]
const html = 'www.google.com' 
class HeaderRewriter
{
 element(element)
 {
    const linksss = element.append(hyperLinkContent,{html:true})
  
 }
}
class imageWriter{
    element(element){
            element.setAttribute("src","https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg")
    }
}
class userName{
    element(element){
        element.prepend("aarshPandit")

    }
}
class profile{
  element(element){
    element.removeAttribute("style")
  }
}

//rewriter will replace/update the fethed HTML content.
const rewriter = new HTMLRewriter()
.on("div#links", new HeaderRewriter()).on("img#avatar",new imageWriter("src")).on("h1#name",new userName()).on("div#profile",new profile())


async function handleRequest(req,event){

    const res = await fetch(req);
     const response = await fetch(someHost)
   const results = await gatherResponse(response)  
//condition for checking the url and based on that the content will be displayed
    if(req.url===url){
    const json = JSON.stringify(linkArray, null, 2)
     return new Response(json, {
         headers: {
           "content-type": "application/json;charset=UTF-8"
         }
       })
   }
     else{
     return rewriter.transform(new Response(results,
     {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    }
     }))

}

}
 