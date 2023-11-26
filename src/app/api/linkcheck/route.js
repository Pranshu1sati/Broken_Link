import { NextResponse } from "next/server";
import {LinkChecker} from 'linkinator'
import axios from "axios";
import cheerio from "cheerio";
import fetch from 'node-fetch';
export function GET(req,res ) {
  // Process a GET request
  console.log(req.method);
  return new Response(JSON.stringify({ message: 'Hello from Next.js!' }));
}

export async function linkiChecker(url) {
    const checker = new LinkChecker();
    let broken = [];
    let fine = 0;
    checker.on("link", (link) => {
        console.log(link, link.state);
        if (link.state === 'BROKEN'||link.status===404) broken.push(new URL(link.url));
        else fine +=1;
    });

    await checker.check({ path: url, recurse: true });

    if (broken.length > 0) {
        return broken;
    } else {
        return `No Links are Broken Broke : 0 links, total: ${fine} links`;
    }
}

export async function POST(req,res){
    const formData = await req.json();
    let {url} = formData;
    if (!url.startsWith('http')) url = 'https://' + url;

    if (url.endsWith('/')) url = url.slice(0, -1);
    // console.log(url, "here");
    const response = await fetch(url, {
              headers: {
                'Content-Type': 'text/html',
              },
            });
        
            if (!response.ok) {
                new Response(JSON.stringify({ message: "The URL itself is invalid" }));
            }
    try{
        const result = await linkiChecker(url);
        return new Response(JSON.stringify({ message: result }));
    }
            catch(err){
                new Response(JSON.stringify({ message: "Error in checking urls plz try again" }))
            }
    
}