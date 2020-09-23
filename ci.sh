function init(){
   echo "------------------------------ INIT ------------------------------"
   
   CMD=${1}
}

function add(){
  yarn build
  cp -r dist/ ./
  git rm -r --cached .
  git add ./bundle.js ./index.html ./main.css  ./main.css.map  ./bundle.js.map
  echo "---------------------added to git cache----------------------------"
  git commit -m 'push new dist file from build action'
  git push anzp2 master
  echo "--------------------already pushed to git--------------------------"
  git push coding master
  echo "--------------------already pushed to coding ----------------------"
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