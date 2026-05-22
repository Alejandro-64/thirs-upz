import { Container } from "@/components";

const Home = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-2 pb-8">
        <div>
          <img
            src="/video-desktop.webp"
            alt="Imagen animada"
            className="object-cover pointer-events-none select-none w-full h-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <img
            src={
              "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_768,w_768/global_bape_x_world_cup_ss26_originals_ss26_launch_plp_banner_statement_1_m_9b0d9dd194.jpg"
            }
            alt="Image 2"
            width={1920}
            height={1080}
            className="h-full"
          />
          <img
            src={
              "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kYSUyMHVyYmFuYXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="Image 3"
            width={1920}
            height={1080}
            className="h-full"
          />
        </div>
        <img
          src={
            "https://smalltalkstudio.biz/cdn/shop/files/ANTON_SMALLTALK_SS26_LINESHEET_83_1.jpg?v=1775822746&width=2000"
          }
          alt="Image 4"
          width={1920}
          height={1080}
          className="h-full"
        />
        <img
          src={
            "https://media.gq.com.mx/photos/6983904090b06586ff31b41c/master/w_1600%2Cc_limit/02_Mode-Adidas%2520Originals-Bape.jpg"
          }
          alt="Image 5"
          width={1920}
          height={1080}
          className="h-full"
        />
      </div>
    </Container>
  );
};

export default Home;
