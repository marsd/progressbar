class Bar {
    constructor(value, limit)
    {
        this.id = this.generateId(3);
        this.value = value;
        this.limit = limit;
        this.percent = this.updatePercent();
    }
    
    updatePercent()
    {
        this.percent = Math.floor(this.value / this.limit * 100);
        
        return this.percent;
    }
    
    create()
    {
        this.elem = $.create("div", {
            className: "bar-item",
            id: `bar-item-${this.id}`,
            contents: [
                {
                    tag: "span",
                    className: "bar-item__value",
                    textContent: this.percent
                },
                {
                    tag: "div",
                    className: "bar-item__fill",
                    "data-bar-value": this.value,
                    "data-bar-percent": this.percent,
                    style: {
                        width: `${this.percent}%`
                    }
                }
            ]
        });
        
        this.bar_value = $(".bar-item__value", this.elem);
        this.bar_fill = $(".bar-item__fill", this.elem);
        return this.elem;
    }
    
    update(val)
    {
        const value = this.value + parseInt(val);
        this.value = (value < 0) ? 0 : value;
        this.updatePercent();
        
        this.bar_value._.set({
            textContent: this.percent
        });
        
        this.bar_fill._.set({
            attributes: {
                "data-bar-value": this.value,
                "data-bar-percent": this.percent,
            },
            style: {
                width: this.percent > 100 ? '100%' : `${this.percent}%`
            }
        });
        
        if (this.value > this.limit) {
            this.elem.classList.add('bar-item--error');
        }
        else {
            this.elem.classList.remove('bar-item--error');
        }
        
        return this.getData();
    }
    
    setValue(value)
    {
        this.value = value;
        this.updatePercent();
        
        return this.getData();
    }
    
    generateId()
    {
        var len = 5,
            text = "",
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        for (var i = 0; i < len; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        return text;
    }
    
    toString()
    {
        return this.getData();
    }
    
    getData()
    {
        return {
            self: this,
            id: this.id,
            value: this.value,
            limit: this.limit,
            elem: this.elem
        };
    }
}

export default Bar;