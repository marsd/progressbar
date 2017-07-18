import Bar from './Bar';

class Bars {
    
    constructor(src, container)
    {
        this.bars = src.bars;
        this.buttons = src.buttons;
        this.limit = src.limit;
        this.container = container;
        
        this.init();
    }
    
    init()
    {
        this.createContainer();
        this.addBars();
    }
    
    createContainer()
    {
        this.container.classList.add('progress-bars');
        this.container._.contents([
            {
                tag: "div",
                className: "bar-holder",
            }
        ]);
        
        this.barholder = $(".bar-holder", this.container);
    }
    
    addBars()
    {
        $.each(this.bars, (i, bar) =>
        {
            const created = new Bar(bar, this.limit);
            created.create();
            
            return created.getData();
        }, this.bars);
        
        this.barholder._.set({contents: Object.values(this.bars).map(bar => bar.elem)});
    }
    
    toString()
    {
        return this.getData();
    }
    
    getData()
    {
        return {
            self: this,
            bars: this.bars,
            buttons: this.buttons,
            limit: this.limit
        };
    }
}
export default Bars;