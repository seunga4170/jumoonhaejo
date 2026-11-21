document.addEventListener("DOMContentLoaded", function() {
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtySpan = document.querySelector('.qty');
    const priceEl = document.querySelector('.price');
    const deleteBtn = document.querySelector('.delete-btn');
    const cartCard = document.querySelector('.cart-card');
    const orderBtn = document.getElementById('orderBtn');

    // 초기 설정 값
    const unitPrice = parseInt(priceEl.getAttribute('data-price'));
    let quantity = parseInt(qtySpan.textContent);
    let deliveryFee = 2000;

    // 금액 업데이트 함수
    function updateTotals() {
        const orderTotal = unitPrice * quantity;
        const finalFee = quantity > 0 ? deliveryFee : 0;
        const finalTotal = orderTotal + finalFee;

        document.getElementById('orderTotal').textContent = orderTotal.toLocaleString() + '원';
        document.getElementById('deliveryFee').textContent = finalFee.toLocaleString() + '원';
        document.getElementById('finalTotal').textContent = finalTotal.toLocaleString() + '원';
    }

    // 수량 빼기
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtySpan.textContent = quantity;
            updateTotals();
        }
    });

    // 수량 더하기
    plusBtn.addEventListener('click', () => {
        quantity++;
        qtySpan.textContent = quantity;
        updateTotals();
    });

    // 메뉴 삭제
    deleteBtn.addEventListener('click', () => {
        cartCard.style.display = 'none';
        quantity = 0;
        updateTotals();
    });

    // 일반 주문 완료 알림
    orderBtn.addEventListener('click', () => {
        if (quantity > 0) {
            alert("주문이 성공적으로 완료되었습니다! 🥗");
        } else {
            alert("장바구니가 비어있습니다. 메뉴를 담아주세요!");
        }
    });
});