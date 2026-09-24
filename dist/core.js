import * as THREE from './vendor/three.module.min.js';

export function createCore(host, motionEnabled) {
 let renderer;
 try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
 catch { return; }
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.25:1.7));
 host.prepend(renderer.domElement);
 renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(38,1,.1,100);
 camera.position.set(0,0,8.3);
 const group=new THREE.Group();scene.add(group);
 const violet=new THREE.Color('#a89af3'),blue=new THREE.Color('#698cc9');
 scene.add(new THREE.AmbientLight('#8e8cac',1.8));
 const light=new THREE.PointLight('#d4c5ff',35);light.position.set(2,3,4);scene.add(light);
 const rim=new THREE.PointLight('#547fff',22);rim.position.set(-3,-1,2);scene.add(rim);
 const solid=new THREE.Mesh(new THREE.IcosahedronGeometry(.81,0),new THREE.MeshPhysicalMaterial({color:'#6c65a9',metalness:.6,roughness:.19,transparent:true,opacity:.88,clearcoat:1,flatShading:true}));group.add(solid);
 const edges=new THREE.LineSegments(new THREE.EdgesGeometry(solid.geometry),new THREE.LineBasicMaterial({color:'#d2bfff',transparent:true,opacity:.8}));solid.add(edges);
 const inner=new THREE.Mesh(new THREE.OctahedronGeometry(.45),new THREE.MeshBasicMaterial({color:'#c4b6ff',wireframe:true,transparent:true,opacity:.8}));group.add(inner);
 const shell=new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.35,1)),new THREE.LineBasicMaterial({color:violet,transparent:true,opacity:.17}));group.add(shell);
 const ringMaterials=[],rings=[];
 for(let i=0;i<4;i++){
  const mat=new THREE.LineBasicMaterial({color:i%2?blue:violet,transparent:true,opacity:i===0?.65:.28});ringMaterials.push(mat);
  const points=[];for(let j=0;j<=180;j++){const angle=j/180*Math.PI*2;points.push(new THREE.Vector3(Math.cos(angle)*(1.8+i*.16),Math.sin(angle)*(1.8+i*.16),0));}
  const ring=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points),mat);ring.rotation.set(.8+i*.5,.25+i*.62,i*.5);group.add(ring);rings.push(ring);
 }
 // A deterministic Fibonacci sphere makes the scene stable between reloads.
 const count=innerWidth<760?110:230,positions=new Float32Array(count*3),colors=new Float32Array(count*3);
 for(let i=0;i<count;i++){const y=1-(i/(count-1))*2,r=Math.sqrt(1-y*y),theta=Math.PI*(3-Math.sqrt(5))*i,radius=1.48+(i%7)*.075;positions.set([Math.cos(theta)*r*radius,y*radius,Math.sin(theta)*r*radius],i*3);const color=i%3?blue:violet;colors.set([color.r,color.g,color.b],i*3);}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
 const particles=new THREE.Points(geo,new THREE.PointsMaterial({size:.022,vertexColors:true,transparent:true,opacity:.8,sizeAttenuation:true}));group.add(particles);
 const orbiters=[];const dotGeo=new THREE.SphereGeometry(.035,8,8),dotMaterial=new THREE.MeshBasicMaterial({color:'#d5ccff'});
 for(let i=0;i<7;i++){const dot=new THREE.Mesh(dotGeo,dotMaterial);group.add(dot);orbiters.push(dot);}
 const starsGeo=new THREE.BufferGeometry(),starPositions=new Float32Array(90*3);
 for(let i=0;i<90;i++){starPositions.set([Math.sin(i*127.1)*4.4,Math.cos(i*311.7)*3.1,-1.5-Math.abs(Math.sin(i))*2],i*3);}
 starsGeo.setAttribute('position',new THREE.BufferAttribute(starPositions,3));const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({size:.012,color:'#8392be',transparent:true,opacity:.5}));scene.add(stars);
 let targetX=0,targetY=0,visible=true,raf=0,last=0,time=0,disposed=false;
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();render();}
 function pointer(e){if(!motionEnabled())return;const r=host.getBoundingClientRect();targetY=((e.clientX-r.left)/r.width-.5)*.5;targetX=((e.clientY-r.top)/r.height-.5)*.3;}
 function resetPointer(){targetX=targetY=0;}
 function render(){renderer.render(scene,camera);}
 function frame(now){raf=0;if(disposed||document.hidden||!visible||!motionEnabled())return;const dt=Math.min((now-last)/1000,.04);last=now;time+=dt;group.rotation.y+=(targetY+time*.065-group.rotation.y)*.025;group.rotation.x+=(targetX-group.rotation.x)*.035;solid.rotation.y=time*.12;solid.rotation.z=Math.sin(time*.25)*.12;shell.rotation.y=-time*.04;particles.rotation.y=time*.025;group.position.y=Math.sin(time*.6)*.05;camera.position.z=8.3+Math.min(scrollY/innerHeight,1)*.65;orbiters.forEach((dot,i)=>{const a=time*(.16+i*.012)+i*.9;dot.position.set(Math.cos(a)*(1.8+i*.04),Math.sin(a)*(.55+i*.13),Math.sin(a+i)*1.2);});render();raf=requestAnimationFrame(frame);}
 function resume(){cancelAnimationFrame(raf);raf=0;if(!document.hidden&&visible&&motionEnabled()){last=performance.now();raf=requestAnimationFrame(frame);}else render();}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resume();},{rootMargin:'80px'});observer.observe(host);
 host.addEventListener('pointermove',pointer,{passive:true});host.addEventListener('pointerleave',resetPointer);document.addEventListener('visibilitychange',resume);document.addEventListener('portfolio:motion',resume);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);host.classList.remove('ready');});
 renderer.domElement.addEventListener('webglcontextrestored',()=>{host.classList.add('ready');resize();resume();});
 resize();host.classList.add('ready');resume();
 addEventListener('pagehide',e=>{if(e.persisted)return;disposed=true;cancelAnimationFrame(raf);resizeObserver.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',resume);document.removeEventListener('portfolio:motion',resume);const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();},{once:true});
}
