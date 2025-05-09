//@ts-check
import { world, system } from '@minecraft/server';
import config from './rankconfig.js'

const rl = config.ranklist;
const r = "§r";

system.runInterval(()=>{
    for(const player of world.getPlayers()){
        let match = false;
        for(const tag of player.getTags()){
            for(let i = 0; i<rl.length; i++){
                if(rl[i].tag === tag){
                    player.nameTag = rl[i].color + "[" + rl[i].tag + "]" + player.name + r;
                    match = true;
                }
            }
        }
        
        if(!match){
            player.nameTag = player.name;
        }
    }
});

world.beforeEvents.chatSend.subscribe((ev)=>{
    const { sender, message } = ev;
    ev.cancel = true;
    let msg = "";
    let match = false;

    for(const tag of sender.getTags()){
        for(let i = 0;i < rl.length; i++){
            if(rl[i].tag === tag) {
                msg = rl[i].color + "[" + rl[i].tag + "]<" + sender.name + "> " + message;
                match = true;
            }
        }
    }

    if(!match){
        msg = "<" + sender.name + "> " + message;
    }

    world.sendMessage(msg);
});