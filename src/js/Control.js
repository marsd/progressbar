import _findKey from 'lodash/findKey';

class Control {
    constructor(bars, container)
    {
        this.progressbar = bars;
        this.container = container;
        
        this.init();
        
        return this;
    }
    
    init()
    {
        this.createContainer();
        this.createBarSelector();
        this.addButtons();
    }
    
    createContainer()
    {
        this.container.classList.add('progress-bars');
        this.container._.contents([
            {
                tag: "div",
                className: "bar-controls",
            }
        ]);
        
        this.controls = $(".bar-controls", this.container);
    }
    
    createBarSelector()
    {
        const added = [''].concat(Object.values(this.progressbar.bars));
        const bars = $.each(added, (i, bar) =>
        {
            return $.create("option", {
                className: "bar-select__item",
                textContent: i == 0 ? 'Select bar' : `Bar #${bar.id}`,
                value: i == 0 ? '' : bar.id
            });
        });
        
        const selector = $.create("div", {
            className: "bar-select",
            contents: [
                {
                    tag: "select",
                    className: "bar-select__selector",
                    name: "bar-select__selector",
                    contents: Object.values(bars),
                    events: {
                        change: e =>
                        {
                            e.preventDefault();
                            let $this = $(e.target);
                            $this.closest('.bar-select').classList.remove('bar-select--error');
                            
                            $$('.bar-item').forEach(item =>
                            {
                                item.classList.remove('bar-item--selected');
                            });
                            
                            if ($this.value === '') {
                                return false;
                            }
                            $(`#bar-item-${$this.value}`).classList.add('bar-item--selected');
                        }
                    }
                }
            ]
        });
        
        this.controls._.contents(selector);
        this.selector = $('.bar-select__selector', this.controls);
    }
    
    addButtons()
    {
        $.each(this.progressbar.buttons, (i, button) =>
        {
            const icon = `<i class="fa fa-${(button > 0) ? 'plus' : 'minus'} fa-lg"></i>`;
            
            return $.create("button", {
                className: "bar-buttons__button",
                innerHTML: `${icon} ${Math.abs(button)}`,
                "data-value": button,
                events: {
                    click: e =>
                    {
                        e.preventDefault();
                        let $this = $(e.target);
                        if (this.selector.value === "") {
                            this.selector.closest('.bar-select').classList.add('bar-select--error');
                            return false;
                        }
                        
                        let id = _findKey(this.progressbar.bars, {id: this.selector.value}),
                            bar = this.progressbar.bars[id];
                        
                        const test = bar.self.update($this.getAttribute("data-value"));
                        this.progressbar.bars[id] = test;
                    }
                }
            });
        }, this.progressbar.buttons);
        
        this.buttons = $.create("div", {
            className: "bar-buttons",
            contents: Object.values(this.progressbar.buttons)
        });
        
        this.controls._.contents(this.buttons);
    }
    
    toString()
    {
        return this.getData();
    }
    
    getData()
    {
        return {
            self: this,
            selector: this.selector,
            buttons: this.buttons
        };
    }
}

export default Control;