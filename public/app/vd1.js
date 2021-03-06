var list;
var Note = React.createClass({
    save(){
        console.log(this.props.id);
        var note = this;
        $.post("/update", {idSua: this.props.id, noiDung: this.refs.txt.value}, function(data){
            list.setState({mang: data});
            note.setState({onEdit: false});
        });
    },
    cancel(){
        this.setState({onEdit: false})
    },    
    edit(){
        this.setState({onEdit: true})
    },
    getInitialState(){
        return{
            onEdit: false
        }
    }
    ,
    detele(){
        console.log("Maaaaa");
        $.post("/delete", {idXoa: this.props.id}, function(data){
            list.setState({mang: data});
        });
    },
    render: function(){
        if(this.state.onEdit){
            return (
                <div className="div-note">
                    <input defaultValue={this.props.children} ref="txt"/>                    
                    <button onClick={this.save}>Luu</button>
                    <button onClick={this.cancel}>Huy</button>
                </div>
            );
        } else {
            return (
                <div className="div-note">
                    <p>{this.props.children}</p>
                    <button onClick={this.detele}>Xoa</button>
                    <button onClick={this.edit}>Sua</button>
                </div>
            );
        }
        
    },
    abc(){

    }
});

function addDiv() {
    ReactDOM.render(<InputDiv/>, document.getElementById('div-add'));    
}

var List = React.createClass({
    getInitialState: function() {
        list = this;
        return({
            mang: []
        });
    },
    componentDidMount(){
        var that = this;
        $.post("/getNotes", function(data){
            that.setState({mang: data})
        });
    },
    render: function(){
        return (
            <div className="div-list">
                <div id="div-add"></div>
                <button onClick={addDiv}>Them</button>
                {
                    this.state.mang.map(function(note, index){
                        return <Note key={index} id={index}>{note}</Note>
                    })
                }
            </div>
        );
    }    
});

var InputDiv = React.createClass({
    send: function() {        
        $.post("/add", {note: this.refs.txt.value}, function (data) {
            list.setState({
                mang: data
            })    
        })
        ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
    },
    render: function() {
        return(
            <div>
                <input type="text" ref="txt" placeholder="Enter your note!" />
                <button onClick={this.send}>Send</button>
            </div>
        );
    }
});

ReactDOM.render(
    <div>
        <List/>        
    </div>    
    ,
    document.getElementById('root')
);