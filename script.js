// 1. 샘플 음식점 데이터 (서버 없이 이 배열만 사용합니다.)
const restaurants = [
  { id: 1, name: "초록한끼", category: "샐러드", menu: "닭가슴살 샐러드 · 연어 샐러드", rating: "4.9", time: "20~30분", fee: "무료", emoji: "🥗", color: "#E9F7E9" },
  { id: 2, name: "포케로운 하루", category: "포케", menu: "연어 포케 · 현미 새우 포케", rating: "4.8", time: "25~35분", fee: "2,000원", emoji: "🍣", color: "#FFF1E7" },
  { id: 3, name: "샌드한입", category: "샌드위치", menu: "통밀 치킨 샌드위치", rating: "4.7", time: "15~25분", fee: "1,500원", emoji: "🥪", color: "#FFF6DE" },
  { id: 4, name: "든든도시락", category: "도시락", menu: "닭가슴살 현미 도시락", rating: "4.9", time: "30~40분", fee: "2,000원", emoji: "🍱", color: "#F1ECFF" },
  { id: 5, name: "가벼운 디저트", category: "저칼로리 간식", menu: "그릭요거트 · 과일컵", rating: "4.8", time: "20~30분", fee: "1,000원", emoji: "🍓", color: "#FFF0F2" }
];

// 2. 카테고리 목록
const categories = [
  { name: "전체", emoji: "🌿" },
  { name: "샐러드", emoji: "🥗" },
  { name: "포케", emoji: "🍚" },
  { name: "샌드위치", emoji: "🥪" },
  { name: "도시락", emoji: "🍱" },
  { name: "저칼로리 간식", emoji: "🍓" }
];

const categoryList = document.querySelector("#categoryList");
const restaurantList = document.querySelector("#restaurantList");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const emptyMessage = document.querySelector("#emptyMessage");
let selectedCategory = "전체";

// 3. 카테고리 버튼 생성
function renderCategories() {
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category" + (selectedCategory === category.name ? " selected" : "");
    button.setAttribute("aria-pressed", String(selectedCategory === category.name));
    button.innerHTML = `<span class="category-emoji" aria-hidden="true">${category.emoji}</span><span class="category-name">${category.name}</span>`;
    button.addEventListener("click", () => {
      selectedCategory = category.name;
      renderCategories();
      renderRestaurants();
    });
    categoryList.appendChild(button);
  });
}

// 4. 검색어 + 카테고리에 맞는 음식점 카드만 표시
function renderRestaurants() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategory === "전체" || restaurant.category === selectedCategory;
    const matchesSearch = `${restaurant.name} ${restaurant.menu} ${restaurant.category}`.toLowerCase().includes(keyword);
    return matchesCategory && matchesSearch;
  });

  restaurantList.innerHTML = "";
  resultCount.textContent = `${filtered.length}곳`;
  emptyMessage.hidden = filtered.length > 0;

  filtered.forEach((restaurant) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "restaurant-card";
    button.innerHTML = `
      <span class="restaurant-image" style="background:${restaurant.color}" role="img" aria-label="${restaurant.category} 대표 이미지">${restaurant.emoji}</span>
      <span class="restaurant-info">
        <strong>${restaurant.name}</strong>
        <span class="restaurant-menu">${restaurant.menu}</span>
        <span class="restaurant-meta"><span class="star">★</span> ${restaurant.rating} · ${restaurant.time}</span>
        <span class="restaurant-meta">배달비 ${restaurant.fee}</span>
      </span>`;
    button.addEventListener("click", () => openRestaurant(restaurant.id));
    restaurantList.appendChild(button);
  });
}

// 5. 상세 페이지를 만든 후에는 아래 alert를 주석의 코드로 바꾸세요.
function openRestaurant(id) {
  alert(`음식점 ${id}번 상세 페이지는 준비 중이에요!`);
  // window.location.href = `restaurant.html?id=${id}`;
}

// 6. 하단 메뉴 (아직 없는 페이지는 안내만 표시)
document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;
    if (page === "홈") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "검색") {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert(`${page} 화면은 준비 중이에요!`);
    }
  });
});

// 7. 입력할 때마다 실시간 검색
searchInput.addEventListener("input", renderRestaurants);

// 처음 화면 실행
renderCategories();
renderRestaurants();
