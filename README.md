# Gltf2 Parser

[![npm](https://img.shields.io/badge/Npm-install-blue?style=flat-square&logo=npm)](https://www.npmjs.com/package/gltf2parser)
[![twitter](https://img.shields.io/badge/Twitter-profile-blue?style=flat-square&logo=twitter)](https://twitter.com/SketchpunkLabs)
[![youtube](https://img.shields.io/badge/Youtube-subscribe-red?style=flat-square&logo=youtube)](https://youtube.com/c/sketchpunklabs)
[![Ko-Fi](https://img.shields.io/badge/Ko_Fi-donate-orange?style=flat-square&logo=youtube)](https://ko-fi.com/sketchpunk)
[![Patreon](https://img.shields.io/badge/Patreon-donate-red?style=flat-square&logo=youtube)](https://www.patreon.com/sketchpunk)



### Setup ###

```
npm install
npm run dev
```

## Usage ###

```javascript
const gltf = await Gltf2Parser.fetch( '../_res/models/nabba/nabba.gltf' );

//--------------------------------
// Example of Turning GTLF Mesh into ThreeJS Mesh
function loadMesh( gltf, name=null, mat=null ){
    const o = gltf.getMesh( name );
    let geo, prim, pmat;

    if( o.primitives.length == 1 ){
        prim = o.primitives[ 0 ];

        if( mat ){          
            pmat = mat;
        }else if( prim.materialIdx != null ){
            pmat = this.loadMaterial( gltf, prim.materialIdx );
        }
        
        geo = this.primitiveGeo( prim );
        return new THREE.Mesh( geo, pmat );
    }else{
        let mesh, m, c ;
        const grp = new THREE.Group();
        for( prim of o.primitives ){

            if( mat ){
                pmat = mat;
            }else if( prim.materialIdx != null ){
                pmat = this.loadMaterial( gltf, prim.materialIdx );
            }
        
            geo     = this.primitiveGeo( prim );
            mesh    = new THREE.Mesh( geo, pmat );
            
            grp.add( mesh );
        }
        return grp;
    }
}

//--------------------------------

function loadMaterial( gltf, id ){
    const config = {};
    const m      = gltf.getMaterial( id );
    if( m ){
        if( m.baseColorFactor ){
            config.color = new THREE.Color( 
                m.baseColorFactor[0], 
                m.baseColorFactor[1], 
                m.baseColorFactor[2] );
        }
    }
    return new THREE.MeshPhongMaterial( config );
}

//--------------------------------

function primitiveGeo( prim ){
    const geo = new THREE.BufferGeometry();
    geo.setAttribute( 'position', 
        new THREE.BufferAttribute( prim.position.data, prim.position.componentLen ) );

    if( prim.indices )
        geo.setIndex( new THREE.BufferAttribute( prim.indices.data, 1 ) );
    
    if( prim.normal )
        geo.setAttribute( 'normal', 
        new THREE.BufferAttribute( prim.normal.data, prim.normal.componentLen ) );
    
    if( prim.texcoord_0 )
        geo.setAttribute( 'uv', 
            new THREE.BufferAttribute( prim.texcoord_0.data, prim.texcoord_0.componentLen ) );

    if( prim.joints_0 && prim.weights_0 ){
        geo.setAttribute( 'skinWeight', 
            new THREE.BufferAttribute( prim.weights_0.data, prim.weights_0.componentLen ) );
        
        geo.setAttribute( 'skinIndex',
            new THREE.BufferAttribute( prim.joints_0.data, prim.joints_0.componentLen ) );
    }

    return geo;
}
```