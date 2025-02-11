const db = localStorage;
const data = db.getItem("list");
// null = 아무것도 없는 값 // object memory
// undefined = 아무것도 없음
const newData = JSON.parse(data);
let list = newData ?? []; // ?? 앞에 조건이 만족되지 않을 때 안전빵으로 출 초기값
const rendering = () => {
  const ul = document.querySelector("ul");
  ul.innerHTML = null;
  for (
    let i = 0;
    i < list.length;
    i = i + 1 // i += 1 // i++
  ) {
    const button = document.createElement("button");
    button.innerText = "삭제";
    button.onclick = () => {
      list.splice(i, 1);
      rendering();
    };
    const p = document.createElement("p");
    p.innerText = list[i];
    const div = document.createElement("div");
    let isEditing = false;
    const cancel = document.createElement("button");
    const confirm = document.createElement("button");
    cancel.innerText = "취소";
    confirm.innerText = "수정";
    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.columnGap = 10;
    cancel.addEventListener("click", () => {
      isEditing = false;
      console.log("취소 ㄱㄱ");
      div.innerHTML = null;
      div.append(p, button);
    });
    const newInput = document.createElement("input");
    const newValue = newInput.value;
    confirm.addEventListener("click", () => {
      list[i] = newValue;
      isEditing = false;
      console.log("수정 끝");
      div.innerHTML = null;
      div.append(p, button);
      alert("수정되었습니다.");
    });
    wrap.append(confirm, cancel);
    const li = document.createElement("li");
    li.append(div);
    ul.append(li);
  }
};
rendering();
const form = document.querySelector("form");
const input = document.getElementById("item");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // 새로고침 방지 // form 태그 한정
  const item = input.value;
  if (item.length === 0) {
    alert("장 볼 물건을 입력해주세요.");
    return input.focus();
  }
  // list.push()
  list.unshift(item);
  console.log(list);
  db.setItem("list", JSON.stringify(list));
  rendering();
  input.value = "";
});
