const months = [
    "فروردین", "اردیبهشت", "خرداد",
    "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر",
    "دی", "بهمن", "اسفند"
];

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function toFa(n) {
    return n.toString().replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

function isLeapJalali(jy) {
    let mod = ((jy - 474) % 2820) + 474;
    return (((mod + 38) * 682) % 2816) < 682;
}

function jalaliMonthDays(y, m) {
    if (m <= 6) return 31;
    if (m <= 11) return 30;
    return isLeapJalali(y) ? 30 : 29;
}

function toJalali(gy, gm, gd) {
    let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days =
        (365 * gy) +
        parseInt((gy2 + 3) / 4) -
        parseInt((gy2 + 99) / 100) +
        parseInt((gy2 + 399) / 400) -
        80 + gd + g_d_m[gm - 1];

    jy += 33 * parseInt(days / 12053);
    days %= 12053;
    jy += 4 * parseInt(days / 1461);
    days %= 1461;

    if (days > 365) {
        jy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }

    let jm = (days < 186)
        ? 1 + parseInt(days / 31)
        : 7 + parseInt((days - 186) / 30);

    let jd = 1 + (
        (days < 186)
            ? (days % 31)
            : ((days - 186) % 30)
    );

    return { y: jy, m: jm, d: jd };
}

function toGregorian(jy, jm, jd) {
    jy += 1595;
    let days =
        -355668 +
        (365 * jy) +
        parseInt(jy / 33) * 8 +
        parseInt(((jy % 33) + 3) / 4) +
        jd;

    if (jm < 7)
        days += (jm - 1) * 31;
    else
        days += ((jm - 7) * 30) + 186;

    let gy = 400 * parseInt(days / 146097);
    days %= 146097;

    if (days > 36524) {
        gy += 100 * parseInt(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }

    gy += 4 * parseInt(days / 1461);
    days %= 1461;

    if (days > 365) {
        gy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }

    let gd = days + 1;
    let sal_a = [
        0, 31,
        (gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0 ? 29 : 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    let gm;
    for (gm = 0; gm < 13; gm++) {
        let v = sal_a[gm];
        if (gd <= v) break;
        gd -= v;
    }

    return { y: gy, m: gm, d: gd };
}

function getFirstDayOfMonth(y, m) {
    let g = toGregorian(y, m, 1);
    let date = new Date(g.y, g.m - 1, g.d);
    let d = date.getDay();
    return (d + 1) % 7;
}

class JalaliDatePicker {
    constructor(input) {
        this.input = input;

        let initDate = new Date();

        if (this.input.dataset.gregorian) {
            let parts = this.input.dataset.gregorian.split('-');
            if (parts.length === 3) {
                initDate = new Date(parts[0], parts[1] - 1, parts[2]);
            }
        }

        let j = toJalali(initDate.getFullYear(), initDate.getMonth() + 1, initDate.getDate());

        let now = new Date();
        this.today = toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());

        this.current = { y: j.y, m: j.m };
        this.selected = null;

        if (this.input.dataset.gregorian) {
            this.selected = { y: j.y, m: j.m, d: j.d };
            this.input.value = toFa(j.y) + "/" + toFa(String(j.m).padStart(2, "0")) + "/" + toFa(String(j.d).padStart(2, "0"));
        }

        this.view = "days";
        this.build();
        this.render();
    }

    build() {
        this.container = document.createElement("div");
        this.container.className = "jalali-calendar";
        this.container.innerHTML = `
        <div class="jc-header">
            <button type="button" class="jc-prev">‹</button>
            <div class="jc-title">
                <span class="jc-month-label"></span>
                <span class="jc-year-label"></span>
            </div>
            <button type="button" class="jc-next">›</button>
        </div>
        <div class="jc-week"></div>
        <div class="jc-body"></div>
        <div class="jc-footer">
            <button type="button" class="today">امروز</button>
        </div>
        `;
        document.body.appendChild(this.container);

        this.input.addEventListener("focus", () => this.open());

        this.container.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        this.container.querySelector(".jc-prev").onclick = () => this.prev();
        this.container.querySelector(".jc-next").onclick = () => this.next();
        this.container.querySelector(".today").onclick = () => this.goToday();

        this.container.querySelector(".jc-month-label").onclick = () => {
            this.view = "months";
            this.render();
        };

        this.container.querySelector(".jc-year-label").onclick = () => {
            this.view = "years";
            this.render();
        };

        document.addEventListener("click", (e) => {
            if (!this.container.contains(e.target) && e.target !== this.input) {
                this.container.style.display = "none";
            }
        });
    }

    open() {
        let rect = this.input.getBoundingClientRect();
        this.container.style.top = (rect.bottom + window.scrollY + 4) + "px";
        this.container.style.left = (rect.left + window.scrollX) + "px";
        this.container.style.display = "block";
    }

    render() {
        this.renderHeader();
        if (this.view === "days") {
            this.container.querySelector(".jc-week").style.display = "grid";
            this.container.querySelector(".jc-footer").style.display = "flex";
            this.renderWeek();
            this.renderDays();
        }
        if (this.view === "months") {
            this.container.querySelector(".jc-week").style.display = "none";
            this.container.querySelector(".jc-footer").style.display = "none";
            this.renderMonths();
        }
        if (this.view === "years") {
            this.container.querySelector(".jc-week").style.display = "none";
            this.container.querySelector(".jc-footer").style.display = "none";
            this.renderYears();
        }
    }

    renderHeader() {
        this.container.querySelector(".jc-month-label").textContent = months[this.current.m - 1];
        this.container.querySelector(".jc-year-label").textContent = toFa(this.current.y);
    }

    renderWeek() {
        let w = this.container.querySelector(".jc-week");
        w.innerHTML = "";
        weekDays.forEach(d => {
            let el = document.createElement("div");
            el.textContent = d;
            w.appendChild(el);
        });
    }

    renderDays() {
        let body = this.container.querySelector(".jc-body");
        body.innerHTML = "";
        body.className = "jc-body jc-days";

        let firstDay = getFirstDayOfMonth(this.current.y, this.current.m);
        for (let i = 0; i < firstDay; i++) {
            let blank = document.createElement("div");
            body.appendChild(blank);
        }

        let days = jalaliMonthDays(this.current.y, this.current.m);
        for (let i = 1; i <= days; i++) {
            let d = document.createElement("div");
            d.textContent = toFa(i);

            let weekIndex = (firstDay + i - 1) % 7;
            if (weekIndex == 6) d.classList.add("friday");

            if (this.today.y == this.current.y && this.today.m == this.current.m && this.today.d == i) {
                d.classList.add("today");
            }

            if (this.selected && this.selected.y == this.current.y && this.selected.m == this.current.m && this.selected.d == i) {
                d.classList.add("selected");
            }

            d.onclick = () => this.selectDay(i);
            body.appendChild(d);
        }
    }

    renderMonths() {
        let body = this.container.querySelector(".jc-body");
        body.innerHTML = "";
        body.className = "jc-body jc-month-grid";
        months.forEach((m, i) => {
            let el = document.createElement("div");
            el.textContent = m;
            if (i + 1 == this.current.m) el.classList.add("active");
            el.onclick = () => {
                this.current.m = i + 1;
                this.view = "days";
                this.render();
            };
            body.appendChild(el);
        });
    }

    renderYears() {
        let body = this.container.querySelector(".jc-body");
        body.innerHTML = "";
        body.className = "jc-body jc-year-grid";
        let startY = this.current.y - 35;
        let endY = this.current.y + 35;
        for (let y = startY; y <= endY; y++) {
            let el = document.createElement("div");
            el.textContent = toFa(y);
            if (y == this.current.y) el.classList.add("active");
            el.onclick = () => {
                this.current.y = y;
                this.view = "months";
                this.render();
            };
            body.appendChild(el);
        }
    }

    selectDay(d) {
        this.selected = { y: this.current.y, m: this.current.m, d: d };

        let g = toGregorian(this.current.y, this.current.m, d);
        this.input.dataset.gregorian = `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}`;

        this.input.value = toFa(this.current.y) + "/" + toFa(String(this.current.m).padStart(2, "0")) + "/" + toFa(String(d).padStart(2, "0"));
        this.container.style.display = "none";
    }

    prev() {
        this.current.m--;
        if (this.current.m < 1) {
            this.current.m = 12;
            this.current.y--;
        }
        this.render();
    }

    next() {
        this.current.m++;
        if (this.current.m > 12) {
            this.current.m = 1;
            this.current.y++;
        }
        this.render();
    }

    goToday() {
        this.current = { y: this.today.y, m: this.today.m };
        this.selectDay(this.today.d);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".jalali-date").forEach(input => {
        new JalaliDatePicker(input);
    });
});