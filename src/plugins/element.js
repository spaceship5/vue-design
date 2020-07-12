import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  Radio,
  Message,
  Input,
  Container,
  Footer,
  Main,
  Header,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Aside,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Table,
  TableColumn,
  popover,
  tag,
  Dialog,
  Card,
  Col,
  TabPane,
  Tabs,
  Tree
} from "element-ui";

Vue.use(Tree);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Card);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(popover);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(tag);

Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

Vue.use(Submenu);

Vue.use(Aside);

Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);

Vue.use(Container);
Vue.use(Footer);

Vue.use(Header);
Vue.use(Main);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.prototype.$message = Message;
