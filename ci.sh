function init(){
   echo "------------------------------ INIT ------------------------------"

   yarn build
   cp -r dist/ ./
   
   CMD=${1}
}

function add(){
  git rm -r --cached .
  git add ./bundle.js ./index.html ./main.css  ./main.css.map  ./bundle.js.map
  echo "---------------------added to git cache----------------------------"
}


function remove(){
  rm -rf ./bundle.js ./index.html ./main.css  ./main.css.map  ./bundle.js.map 
  echo "-------------------------remove from ./----------------------------"
}

function main(){
  case ${CMD} in 
  a*) add ;;
  r*) remove;;
  esac
}

init $@
main