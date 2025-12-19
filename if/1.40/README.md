# if v1.40

---

## click
````ts
if (isVisible(el) && !isDisabled(el)) {
    try {
        waitSeconds(5);
        el.click();
    } catch (Exception1 | Exception2 e) {
        // handle
    }
}
````
