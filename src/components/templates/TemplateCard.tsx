import clsx from "clsx";
import type { TemplateModel } from "./TemplateData";
import { useRouter } from "next/router";
import { useAgentInputStore } from "../../stores/agentInputStore";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Popconfirm } from "antd";
import { deletetemplate } from '../../services/user';

type TemplateCardProps = {
  model: TemplateModel;
  init: () => void;
  setRow: (category: any) => void;
  showModal: () => void;
};

const TemplateCard = ({ model, init, setRow, showModal }: TemplateCardProps) => {
  const router = useRouter();
  const setNameInput = useAgentInputStore.use.setNameInput();
  const setGoalInput = useAgentInputStore.use.setGoalInput();

  const handleClick = () => {
    setNameInput(model.name);
    setGoalInput(model.promptTemplate);
    router.push("/").catch(console.log);
  };
  const confirm = async (id: any) => {

    const res = await deletetemplate(id);
    if (res.code === 200) {
      init()
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }

  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "h-34 w-full max-w-lg cursor-pointer space-y-2 whitespace-normal rounded-2xl border border-white/20 p-4 text-left transition-all duration-100",
        "bg-zinc-900 transition-colors hover:bg-zinc-800 group"
      )}
    >
      <div className="flex items-center relative">
        {/* <div className="mr-2 text-xl text-white">{model.icon}</div> */}
        <div className={`text-md mb-0 font-bold text-white`}>{model.name}</div>
        <div className={clsx("text-white absolute right-0 top-[-3px] hidden ", model.templateType && 'group-hover:block')}>
          <EditOutlined className="mr-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              showModal();
              setRow(model);
            }} />
          <Popconfirm
            title="Delete the template"
            description="Are you sure to delete this template?"
            onConfirm={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              confirm(model.id)
            }}
            onCancel={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }} />
          </Popconfirm>
        </div>
      </div>
      <div className={clsx(`mb-2 inline-block rounded-full  text-xs text-gray-400`)}>
        {model.category}
      </div>
      <div className={`text-sm text-gray-200`}>{model.description}</div>

    </div >
  );
};

export default TemplateCard;
